import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";




export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    // Cek apakah pengguna login
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Anda harus login untuk menambahkan komentar" },
        { status: 401 }
      );
    }
    
    const allAnime = await prisma.anime.findMany();
  

    return NextResponse.json({"listanim":allAnime});
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan komentar" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // Cek apakah pengguna login
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Anda harus login untuk menambahkan komentar" },
        { status: 401 }
      );
    }

  

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan komentar" },
      { status: 500 }
    );
  }
}