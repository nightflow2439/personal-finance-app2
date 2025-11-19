'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addRecord(formData) {
  const amount = parseFloat(formData.get("amount"));
  const type = formData.get("type");
  const note = formData.get("note");
  await prisma.record.create({
    data: {
      amount: amount,
      type: type,
      note: note
    }
  });
  revalidatePath("/");
  redirect("/");
}

export async function deleteRecord(formData) {
  const id = parseInt(formData.get("id"));
  await prisma.record.delete({
    where: { id: id }
  });
  revalidatePath("/");
}

export async function editRecord(formData) {
  const id = parseInt(formData.get("id"));
  redirect(`/edit/${id}`);
}

export async function updateRecord(formData) {
  const id = parseInt(formData.get("id"));
  const amount = parseFloat(formData.get("amount"));
  const type = formData.get("type");
  const note = formData.get("note");
  await prisma.record.update({
    where: {
      id: id
    },
    data: {
      amount: amount,
      type: type,
      note: note
    }
  });
  revalidatePath("/");
  redirect("/");
}

export async function selectMode(formData) {
  const mode = formData.get("mode");
  console.log(mode);
  if (mode == "收支总览")
    redirect("/");
  else if (mode == "按日查看")
    redirect("/datemode");
}

export async function filterDate(formData) {

}