import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFICATION_EMAIL = "info@onelinker.ai";

const DEPLOYMENT_LABELS: Record<string, string> = {
  supabase_cloud: "Supabase Cloud",
  self_hosted_supabase: "Self-Hosted Supabase",
  not_sure: "Not Sure (Needs Advice)",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectUrl, projectSize, message, deploymentPreference } = body;

    const supabaseAdmin = getSupabaseAdmin();
    const { data: leadData, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          first_name: name.split(' ')[0] || name,
          last_name: name.split(' ').slice(1).join(' ') || '',
          email: email,
          project_url: projectUrl,
          message: `Size: ${projectSize}. Details: ${message}`,
          source: 'contact_form',
          deployment_preference: deploymentPreference || 'not_sure',
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: "Failed to save lead info" }, { status: 500 });
    }

    if (resend) {
      try {
        const deployLabel = DEPLOYMENT_LABELS[deploymentPreference] ?? deploymentPreference ?? 'Not specified';
        await resend.emails.send({
          from: "Lovable Migration <notifications@resend.dev>",
          to: NOTIFICATION_EMAIL,
          subject: `New Lead: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #3ecf8e;">New Migration Inquiry Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Project URL:</strong> ${projectUrl || 'N/A'}</p>
              <p><strong>Project Size:</strong> ${projectSize}</p>
              <p><strong>Deployment Preference:</strong> <span style="color:#3ecf8e;font-weight:bold">${deployLabel}</span></p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #3ecf8e;">
                ${message}
              </div>
              <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 10px; color: #888;">Lead ID: ${leadData.id}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email notification error:', emailError);
      }
    }

    return NextResponse.json({ success: true, leadId: leadData.id });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
