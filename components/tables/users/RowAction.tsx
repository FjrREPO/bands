"use client";

import React, { useState } from "react";
import { UsersRow } from "./columns";
import { Button } from "../../ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import DeleteUserDialog from "@/app/(dashboard)/dashboard/users/_components/DeleteUserDialog";
import { useRouter } from "next/navigation";
import EditUser from "@/app/(dashboard)/dashboard/users/_components/EditUser";

export default function RowAction({
  user,
}: {
  user: UsersRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const route = useRouter()

  return (
    <>
      <DeleteUserDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        userId={user.id}
      />
      <div className="flex flex-row gap-2">
        <EditUser user={user} trigger={
          <Button
            variant={"outline"}
            size={"icon"}
          >
            <Pencil className="h-4 w-4 shrink-0 text-green-500" />
          </Button>
        } />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowDeleteDialog(true)}
        >
          <TrashIcon className="h-4 w-4 shrink-0 text-rose-500" />
        </Button>
      </div>
    </>
  );
}
