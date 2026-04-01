import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const { enabled } = await request.json();
    const envPath = join(process.cwd(), ".env.local");
    
    // Read current .env.local
    let envContent = await readFile(envPath, "utf-8");
    
    // Update NEXT_PUBLIC_MAINTENANCE_MODE
    const regex = /NEXT_PUBLIC_MAINTENANCE_MODE=.*/;
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `NEXT_PUBLIC_MAINTENANCE_MODE=${enabled}`);
    } else {
      envContent += `\nNEXT_PUBLIC_MAINTENANCE_MODE=${enabled}\n`;
    }
    
    // Write back
    await writeFile(envPath, envContent, "utf-8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating maintenance mode:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
