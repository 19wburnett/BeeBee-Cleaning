import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, service, message } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "BeeBee Cleaning Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "vivian@beebeecleaningservices.com",
      subject: `New Lead: ${service} inquiry from ${name}`,
      html: `
        <h2>New Contact Request from BeeBeeCleaning.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Address:</strong> ${address || "Not provided"}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided."}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
