import React, { useState } from "react";
import { customers as initialCustomers, Customer } from "../data/customers";
import NetworkGraph from "../components/NetworkGraph";
import CustomerSidebar from "../components/CustomerSidebar";
import AddCustomerForm from "../components/AddCustomerForm";

export default function Network() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomerList((prev) => [...prev, newCustomer]);
  };

  return (
    <div className="flex">
      <div className="w-3/4 h-screen relative z-0">
        <NetworkGraph customers={customerList} onSelect={setSelectedCustomer} />
      </div>
      <div className="w-1/4 bg-white shadow h-screen overflow-y-auto p-4 relative z-10">
        <CustomerSidebar customer={selectedCustomer} />
        <AddCustomerForm customers={customerList} onAdd={handleAddCustomer} />
      </div>
    </div>
  );
}
