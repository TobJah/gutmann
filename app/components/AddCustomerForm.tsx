"use client";

import React, { useState } from "react";
import { Customer } from "../lib/customers";

type Props = {
  customers: Customer[];
  onAdd: (newCustomer: Customer) => void;
};

export default function AddCustomerForm({ customers, onAdd }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [joined, setJoined] = useState("");
  const [referredBy, setReferredBy] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: Date.now().toString(),
      firstName,
      lastName,
      profession,
      joined,
      referredBy: referredBy || undefined,
    };
    onAdd(newCustomer);
    setFirstName("");
    setLastName("");
    setProfession("");
    setJoined("");
    setReferredBy("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-6">
      <h3 className="text-lg font-semibold">Neuen Kunden hinzufügen</h3>
      <input
        className="w-full p-2 border rounded"
        placeholder="Vorname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Nachname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Beruf"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="date"
        value={joined}
        onChange={(e) => setJoined(e.target.value)}
        required
      />
      <select
        className="w-full p-2 border rounded"
        value={referredBy}
        onChange={(e) => setReferredBy(e.target.value)}
      >
        <option value="">Empfohlen von (optional)</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.firstName} {c.lastName}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-green-800 text-white px-4 py-2 rounded w-full mt-2"
      >
        Speichern
      </button>
    </form>
  );
}
