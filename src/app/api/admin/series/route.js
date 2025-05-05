import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import slugify from 'slugify';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const status = searchParams.get("status");
  const search = searchParams.get("search")?.toLowerCase() || ""; // Ambil query search
  const page = parseInt(searchParams.get("page") || "1", 10); // Halaman
  const limit = 10;
  const offset = (page - 1) * limit;

  // Membuat query filter
  const where = {
    ...(status && status !== "all" && { status }), // Filter berdasarkan status
    ...(search && { // Filter berdasarkan search judul
      judul: {
        contains: search,
        mode: "insensitive", // Pencarian tanpa memperhatikan kapitalisasi
      },
    }),
  };

  // Ambil data dan total count
  const [data, total] = await Promise.all([
    prisma.anime.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.anime.count({ where }), // Hitung total hasil filter
  ]);

  // Kembalikan hasil dalam bentuk JSON
  return NextResponse.json({
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit), // Total halaman berdasarkan total data
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      alternative,
      author,
      artist,
      serialization,
      released,
      rating,
      genres,
      status,
      publishState,
    } = body;

    if (!title) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Cek duplikasi
    const exists = await prisma.anime.findUnique({ where: { urlLinkSlug: slug } });
    if (exists) {
      return NextResponse.json({ message: 'Series with this title already exists.' }, { status: 400 });
    }

    const anime = await prisma.anime.create({
      data: {
        tittle: title,
        judul: description,
        altJudul: alternative,
        urlLinkSlug: slug,
        status,
        postStatus: publishState,
        musim: serialization,
        releaseDateOn: released,
        rating,
        genres: {
          connectOrCreate: genres
            .split(',')
            .map(g => g.trim())
            .filter(Boolean)
            .map(name => ({
              where: { slug: slugify(name, { lower: true }) },
              create: { name, slug: slugify(name, { lower: true }) },
            })),
        },
      },
      include: {
        genres: true,
      },
    });

    return NextResponse.json({ ...anime, slug }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
/*
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
*/