import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, service, cleaningType, squareFootage, floors, bathrooms, kitchens, rooms, message } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0; color: #020202;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #020202; color: #ffffff; padding: 30px; text-align: center; border-bottom: 5px solid #F6CC1F;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Request</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">You have received a new lead from <strong>BeeBeeCleaning.com</strong>:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; width: 140px;"><strong>Name</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Email</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #bfa017; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Phone</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Service Address</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${address || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Service Requested</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${service}${cleaningType ? ` (${cleaningType})` : ""}</td>
              </tr>
              ${squareFootage ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Square Footage</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${squareFootage} sq ft</td></tr>` : ""}
              ${floors ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Floors</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${floors}</td></tr>` : ""}
              ${bathrooms ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Bathrooms</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${bathrooms}</td></tr>` : ""}
              ${kitchens ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Kitchens</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${kitchens}</td></tr>` : ""}
              ${rooms ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;"><strong>Rooms</strong></td><td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">${rooms}</td></tr>` : ""}
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 10px; font-size: 18px;">Message:</h3>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 6px; font-style: italic; line-height: 1.5;">
              ${message ? message.replace(/\n/g, '<br>') : "No additional message provided."}
            </div>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee;">
            &copy; ${currentYear} BeeBee Cleaning Services
          </div>
        </div>
      </div>
    `;

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0; color: #020202;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #020202; color: #ffffff; padding: 30px; text-align: center; border-bottom: 5px solid #F6CC1F;">
            <h1 style="margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">We have received your request for <strong>${service}${cleaningType ? ` (${cleaningType})` : ""}</strong>. Our team at BeeBee Cleaning will review your information and get back to you shortly with a free quote.</p>
            
            <div style="background-color: #fdfdfd; border: 1px solid #eeeeee; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
              <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 18px; color: #020202;">Summary of your request:</h3>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong>Address:</strong> ${address || "Not provided"}</p>
              ${squareFootage || floors || bathrooms || kitchens || rooms ? `<p style="margin: 8px 0;"><strong>Property details:</strong> ${[squareFootage && `${squareFootage} sq ft`, floors && `${floors} floor(s)`, bathrooms && `${bathrooms} bathroom(s)`, kitchens && `${kitchens} kitchen(s)`, rooms && `${rooms} room(s)`].filter(Boolean).join(", ")}</p>` : ""}
              ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong><br/><span style="color: #555;">${message.replace(/\n/g, '<br>')}</span></p>` : ''}
            </div>

            <p style="font-size: 16px; line-height: 1.5;">If you need immediate assistance, please call us at <strong style="color: #020202;">385-326-5993</strong>.</p>
            
            <p style="font-size: 16px; line-height: 1.5; margin-top: 30px;">Best regards,<br/><strong>The BeeBee Cleaning Team</strong></p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee;">
            &copy; ${currentYear} BeeBee Cleaning Services | <a href="https://beebeecleaningservices.com" style="color: #bfa017; text-decoration: none;">beebeecleaningservices.com</a>
          </div>
        </div>
      </div>
    `;

    const adminEmailPromise = resend.emails.send({
      from: "BeeBee Cleaning <noreply@beebeecleaningservices.com>",
      to: process.env.CONTACT_EMAIL || "vivian@beebeecleaningservices.com",
      subject: `New Lead: ${service} inquiry from ${name}`,
      html: adminEmailHtml,
    });

    const userEmailPromise = resend.emails.send({
      from: "BeeBee Cleaning <noreply@beebeecleaningservices.com>",
      to: email,
      subject: `We received your request, ${name}! - BeeBee Cleaning`,
      html: userEmailHtml,
    });

    const [adminResult, userResult] = await Promise.all([adminEmailPromise, userEmailPromise]);

    if (adminResult.error || userResult.error) {
      const error = adminResult.error || userResult.error;
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error?.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: adminResult.data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
