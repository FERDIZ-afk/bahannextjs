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

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // Cek apakah pengguna login
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Anda harus login untuk menambahkan komentar" },
        { status: 401 }
      );
    }
    const body = await req.json();

    const {
      tittle,
      judul,
      altJudul,
      urlLinkSlug,
      status,
      postStatus,
      image,
      duration,
      musim,
      releaseDateOn,
      updatedOn,
      rating,
      genreIds, // array of genre IDs (string[])
    } = body;
    
    const newAnime = await prisma.anime.create({
      data: {
        tittle,
        judul,
        altJudul,
        urlLinkSlug,
        status,
        postStatus,
        image,
        duration,
        musim,
        releaseDateOn,
        updatedOn,
        rating,
        genres: {
          connect: genreIds?.map(id => ({ id })),
        },
      },
      include: {
        genres: true,
      },
    });
    
    
    return NextResponse.json(JSON.stringify(newAnime), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan komentar" },
      { status: 500 }
    );
  }
}