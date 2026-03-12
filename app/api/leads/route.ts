import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFICATION_EMAIL = "info@onelinker.ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectUrl, projectSize, message } = body;

    // 1. Save to Supabase
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
          source: 'contact_form'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: "Failed to save lead info" }, { status: 500 });
    }

    // 2. Send Email Notification via Resend
    // We only attempt this if RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Lovable Migration <notifications@resend.dev>", // Or verified domain
          to: NOTIFICATION_EMAIL,
          subject: `New Lead: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #3ecf8e;">New Migration Inquiry Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Project URL:</strong> ${projectUrl || 'N/A'}</p>
              <p><strong>Project Size:</strong> ${projectSize}</p>
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
        // We don't return an error to the user if ONLY the email fails
      }
    }

    return NextResponse.json({ success: true, leadId: leadData.id });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
