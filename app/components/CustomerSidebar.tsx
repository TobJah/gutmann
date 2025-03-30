"use client";

import React from "react";
import { Customer } from "../lib/customers";

type Props = {
  customer: Customer | null;
};

export default function CustomerSidebar({ customer }: Props) {
  return (
    <aside className="w-[350px] bg-white text-[#0d2f1d] p-6 shadow-md h-full overflow-y-auto">
      {!customer ? (
        <p className="text-sm text-[#0d2f1d]">Wähle einen Kunden aus dem Netzwerk aus.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Kundendetails</h2>
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-semibold">Name:</span>{" "}
              {customer.firstName} {customer.lastName}
            </div>
            <div>
              <span className="font-semibold">Beruf:</span>{" "}
              {customer.profession}
            </div>
            <div>
              <span className="font-semibold">Eintritt:</span>{" "}
              {new Date(customer.joined).toLocaleDateString()}
            </div>
            {customer.referredBy && (
              <div>
                <span className="font-semibold">Empfohlen von:</span>{" "}
                {customer.referredBy}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
