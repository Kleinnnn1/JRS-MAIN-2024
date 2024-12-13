import { createClient } from '@supabase/supabase-js';s
/**
 * Fetch notifications
 * @returns {Promise<Array>} List of notifications
 */
export async function fetchNotifications() {
  try {
    const { data, error } = await supabase
      .from('Notification')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in fetchNotifications:', err);
    throw err;
  }
}

/**
 * Add a notification
 * @param {Object} params - Notification parameters
 * @param {string} params.message - The notification message
 * @param {number} params.idNumber - The ID number of the user
 * @param {number} params.requestId - The request ID the notification is related to
 * @returns {Promise<Object>} The created notification
 */
export async function addNotification({ message, idNumber, requestId }) {
  if (!message || !idNumber || !requestId) {
    throw new Error('Message, idNumber, and requestId are required');
  }

  try {
    const { data, error } = await supabase
      .from('Notification')
      .insert({
        message,
        timestamp: new Date().toISOString(),
        idNumber,
        requestId,
      });

    if (error) {
      console.error('Error inserting notification:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in addNotification:', err);
    throw err;
  }
}

/**
 * Create a notification when a staff member is assigned to a request
 * @param {Object} params - Assignment parameters
 * @param {number} params.requestId - The request ID
 * @param {string} params.staffName - The full name of the staff member
 * @returns {Promise<Object>} The created notification
 */
export async function notifyStaffAssignment({ requestId, staffName }) {
  if (!requestId || !staffName) {
    throw new Error('RequestId and staffName are required');
  }

  try {
    const { data: staffUser, error: staffError } = await supabase
      .from('User')
      .select('idNumber')
      .eq('fullname', staffName)
      .single();

    if (staffError || !staffUser) {
      console.error('Error fetching staff user data:', staffError);
      throw new Error('Staff user not found');
    }

    const { idNumber } = staffUser;

    const { data, error } = await supabase
      .from('Notification')
      .insert({
        message: `[ASSIGNED]: You have been assigned to Request ID: ${requestId}`,
        timestamp: new Date().toISOString(),
        idNumber,
        requestId,
      });

    if (error) {
      console.error('Error inserting assignment notification:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error in notifyStaffAssignment:', err);
    throw err;
  }
}

/**
 * Listen for new department request assignments and create notifications
 */
export function listenToAssignments() {
  const subscription = supabase
    .channel('table-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'Department_request_assignment',
      },
      async (payload) => {
        try {
          const newAssignment = payload.new;

          if (!newAssignment) {
            console.error('Invalid payload:', payload);
            return;
          }

          const { requestId, staffName } = newAssignment;

          if (!requestId || !staffName) {
            console.warn('Skipping notification due to missing fields:', newAssignment);
            return;
          }

          await notifyStaffAssignment({ requestId, staffName });

          console.log('Notification created for new assignment:', newAssignment);
        } catch (error) {
          console.error('Error processing assignment notification:', error);
        }
      }
    )
    .subscribe();

  console.log('Real-time listener setup complete.');

  return () => {
    console.log('Unsubscribing from real-time listener.');
    subscription.unsubscribe();
  };
}
