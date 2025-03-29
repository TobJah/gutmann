import React from "react";
import { Customer } from "../data/customers";

type Props = {
  customer: Customer | null;
};

export default function CustomerSidebar({ customer }: Props) {
  if (!customer) {
    return <p className="text-gray-500">Wähle einen Kunden aus dem Netzwerk aus.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Kundendetails</h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Name:</span> {customer.firstName} {customer.lastName}
        </div>
        <div>
          <span className="font-semibold">Beruf:</span> {customer.profession}
        </div>
        <div>
          <span className="font-semibold">Eintritt:</span> {new Date(customer.joined).toLocaleDateString()}
        </div>
        {customer.referredBy && (
          <div>
            <span className="font-semibold">Empfohlen von:</span> {customer.referredBy}
          </div>
        )}
      </div>
    </div>
  );
}
