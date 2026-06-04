export interface Memory {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  date?: string;
  animation: "slideUp" | "fadeIn" | "zoomIn";
}

export const memories: Memory[] = [
  {
    id: 1,
    title: "The Beginning",
    subtitle: "Awal Semuanya",
    content:
      "Aku masih ingat awal semuanya. Saat itu mungkin hanya percakapan biasa. Tapi lucunya, dari banyak percakapan yang pernah terjadi dalam hidupku, justru yang satu ini tidak pernah benar-benar hilang dari ingatan.",
    image: "/photos/memory-01.jpg",
    animation: "slideUp",
  },
  {
    id: 2,
    title: "My Favorite Version Of You",
    subtitle: "Versi Terbaikmu",
    content:
      "Aku suka banyak hal tentangmu. Tapi yang paling aku suka adalah bagaimana kamu tetap menjadi dirimu sendiri. Tidak perlu menjadi sempurna untuk menjadi istimewa.",
    image: "/photos/memory-02.jpg",
    animation: "fadeIn",
  },
  {
    id: 3,
    title: "A Memory Worth Keeping",
    subtitle: "Kenangan yang Layak Disimpan",
    content:
      "Ada beberapa momen yang tidak terlihat besar saat terjadi. Tapi setelah berlalu, baru terasa bahwa itu adalah momen yang ingin terus disimpan.",
    image: "/photos/memory-03.jpg",
    animation: "zoomIn",
  },
];
