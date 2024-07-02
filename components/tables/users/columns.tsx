"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableUsersColumnHeader } from "./ColumnHeader";
import RowAction from "./RowAction";
import { getUserType } from "@/app/api/auth/user/route";

export type UsersRow = getUserType[0];

export const columnsUsers: ColumnDef<UsersRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="User Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="User Email"
      />
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction user={row.original} />,
  },
];
