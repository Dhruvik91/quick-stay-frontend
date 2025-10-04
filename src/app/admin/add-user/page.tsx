import { Metadata } from "next";
import { AddUserForm } from "@/components/forms/AddUserForm";

export const metadata: Metadata = {
  title: "Add New Accommodation",
  description: "Add a new accommodation listing to Quick Stay",
};

export default function AddUserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AddUserForm />
    </div>
  );
}
