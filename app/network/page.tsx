"use client";

import React, { useState } from "react";
import { customers as initialCustomers, Customer } from "../lib/customers";
import NetworkGraph from "../components/NetworkGraph";
import CustomerSidebar from "../components/CustomerSidebar";
import AddCustomerForm from "../components/AddCustomerForm";

export default function NetworkPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomerList((prev) => [...prev, newCustomer]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]"> {/* 64px = Headerhöhe */}
      {/* Linker Bereich: Graph */}
      <div className="flex-1 relative overflow-hidden">
        <NetworkGraph customers={customerList} onSelect={setSelectedCustomer} />
      </div>

      {/* Rechter Bereich: Sidebar */}
      <div className="w-[350px] bg-white text-[#0d2f1d] p-6 shadow-lg overflow-y-auto border-l border-gray-200 flex flex-col justify-between">
        <div>
          <CustomerSidebar customer={selectedCustomer} />
        </div>

        <div className="mt-6 border-t pt-4">
          <AddCustomerForm customers={customerList} onAdd={handleAddCustomer} />
        </div>
      </div>
    </div>
  );
}
