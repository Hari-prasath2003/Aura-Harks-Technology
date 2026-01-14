// Simple passthrough edge function
// This function is not actively used - the app uses Resend API directly
// Keeping it minimal to allow successful deployment

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Simple health check response
  return new Response(
    JSON.stringify({ 
      status: "ok",
      message: "This function is not actively used. App uses Resend API directly.",
      timestamp: new Date().toISOString()
    }),
    { 
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    }
  )
})
