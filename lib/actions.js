'use server'

import { prisma } from "@/lib/prisma";
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
  else if (mode == "按月查看")
    redirect("/monthmode");
}

export async function getRecordsByDate(date) {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const records = await prisma.record.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    }
  });

  return records;
}

export async function getRecordsByMonth(month) {
  const [monthName, yearStr] = month.split(' ');
  const year = parseInt(yearStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = monthNames.indexOf(monthName);

  const startMonth = new Date(year, monthIndex, 1);
  startMonth.setHours(0, 0, 0, 0);
  const endMonth = new Date(year, monthIndex + 1, 0);
  endMonth.setHours(23, 59, 59, 999);

  const records = await prisma.record.findMany({
    where: {
      date: {
        gte: startMonth,
        lte: endMonth
      }
    }
  });

  return records;
}

export async function handleCategory(formData) {
  const id = formData.get("id");
  redirect(`categories/${id}`);
}

export async function editCategory(formData) {
  const id = parseInt(formData.get("id"));
  const cat = formData.get("cat");
  const newcat = formData.get("newcat");
  if (!newcat)
    return;
  const record = await prisma.record.findUnique({
    where: {
      id: id
    }
  });
  const newCategories = record.categories.map(item =>
    (item === cat ? newcat : item)
  );
  await prisma.record.update({
    where: { id: id },
    data: {
      categories: newCategories
    }
  });
  revalidatePath(`/categories/${id}`);
  redirect(`/categories/${id}`);
}

export async function addCategory(formData) {
  const id = parseInt(formData.get("id"));
  const newcat = formData.get("newcat");
  if (!newcat)
    return;
  const record = await prisma.record.findUnique({
    where: {
      id: id
    }
  });
  const newCategories = record.categories ? [...record.categories, newcat] : [newcat];
  await prisma.record.update({
    where: { id: id },
    data: {
      categories: newCategories
    }
  });
  revalidatePath(`/categories/${id}`);
  redirect(`/categories/${id}`);
}

export async function deleteCategory(formData) {
  const id = parseInt(formData.get("id"));
  const cat = formData.get("cat");
  const record = await prisma.record.findUnique({
    where: {
      id: id
    }
  });
  const newCategories = record.categories.filter(item => item !== cat);
  await prisma.record.update({
    where: { id: id },
    data: {
      categories: newCategories
    }
  });
  revalidatePath(`/categories/${id}`);
  redirect(`/categories/${id}`);
}