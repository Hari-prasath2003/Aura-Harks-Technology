/**
 * Supabase Connection Test Utility
 * Use this to verify your Supabase setup is working correctly
 */

import { supabase } from './client';

export interface TestResult {
  success: boolean;
  message: string;
  details?: any;
}

/**
 * Test if Supabase client is properly configured
 */
export async function testConnection(): Promise<TestResult> {
  try {
    const { data, error } = await supabase.from('form_submissions').select('count');
    
    if (error) {
      return {
        success: false,
        message: 'Failed to connect to Supabase',
        details: error,
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
      details: data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Connection error',
      details: error,
    };
  }
}

/**
 * Test if form_submissions table exists and is accessible
 */
export async function testTableExists(): Promise<TestResult> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('id')
      .limit(1);

    if (error) {
      if (error.message.includes('does not exist')) {
        return {
          success: false,
          message: 'Table "form_submissions" does not exist. Please run the migration SQL.',
          details: error,
        };
      }
      
      return {
        success: false,
        message: 'Error accessing table',
        details: error,
      };
    }

    return {
      success: true,
      message: 'Table "form_submissions" exists and is accessible',
      details: data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Table check failed',
      details: error,
    };
  }
}

/**
 * Test if we can insert data (RLS policy check)
 */
export async function testInsertPermission(): Promise<TestResult> {
  try {
    const testData = {
      services: ['Test Service'],
      email: 'test@example.com',
      whatsapp: '+1234567890',
      action_type: 'enquiry',
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([testData])
      .select('id')
      .single();

    if (error) {
      return {
        success: false,
        message: 'Insert permission denied. Check RLS policies.',
        details: error,
      };
    }

    // Clean up test data
    await supabase.from('form_submissions').delete().eq('id', data.id);

    return {
      success: true,
      message: 'Insert permission granted. RLS policies working correctly.',
      details: data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Insert test failed',
      details: error,
    };
  }
}

/**
 * Run all tests and return comprehensive results
 */
export async function runAllTests(): Promise<{
  overall: boolean;
  tests: {
    connection: TestResult;
    table: TestResult;
    insert: TestResult;
  };
}> {
  console.log('🔍 Running Supabase connection tests...\n');

  const connection = await testConnection();
  console.log('1️⃣ Connection Test:', connection.success ? '✅' : '❌', connection.message);

  const table = await testTableExists();
  console.log('2️⃣ Table Test:', table.success ? '✅' : '❌', table.message);

  const insert = await testInsertPermission();
  console.log('3️⃣ Insert Test:', insert.success ? '✅' : '❌', insert.message);

  const overall = connection.success && table.success && insert.success;
  
  console.log('\n' + '='.repeat(50));
  console.log(overall ? '✅ All tests passed!' : '❌ Some tests failed');
  console.log('='.repeat(50));

  return {
    overall,
    tests: {
      connection,
      table,
      insert,
    },
  };
}

/**
 * Get current submission count
 */
export async function getSubmissionCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('form_submissions')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting submission count:', error);
    return 0;
  }
}

/**
 * Get submissions by action type
 */
export async function getSubmissionsByType(): Promise<{
  immediate: number;
  enquiry: number;
}> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('action_type');

    if (error) throw error;

    const immediate = data?.filter(s => s.action_type === 'immediate').length || 0;
    const enquiry = data?.filter(s => s.action_type === 'enquiry').length || 0;

    return { immediate, enquiry };
  } catch (error) {
    console.error('Error getting submissions by type:', error);
    return { immediate: 0, enquiry: 0 };
  }
}

// Example usage in console:
// import { runAllTests } from './utils/supabase/test';
// runAllTests().then(results => console.log(results));
