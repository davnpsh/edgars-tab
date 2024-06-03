"use client";

import texture from "@/assets/img/wrinkled-paper-texture.jpg";
import barcode from "@/assets/img/barcode.png";
import Image from "next/image";
import { cn, merchant_copy, getFormattedDate } from "@/lib/utils";
import Item from "./Item";
import NewItem from "./NewItem";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  description: string;
  price: number;
  amount: number;
}

export default function Receipt() {
  const [hostname, setHostname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[] | null>(null);

  // Refresh on CRUD operations (this behaves as a signal, not a switch)
  const [refresh, setRefresh] = useState<boolean>(false);
  function toggleRefresh() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  // Fetch items of the receipt
  useEffect(() => {
    setLoading(true);

    async function loadItems() {
      const res = await fetch("/api/receipt");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    }

    loadItems();
  }, [refresh]);

  return loading ? (
    <Loader2 className="mr-2 h-16 w-16 animate-spin" />
  ) : (
    <div
      className="max-w-md p-5 w-full select-none"
      style={{
        backgroundImage: `url(${texture.src})`,
        backgroundPosition: "center",
      }}
    >
      <div className="title text-center py-6">
        <h2 className="text-4xl font-bold mb-2">DEBTS</h2>
        <h3 className="">EVERYTHING EDGAR WILL PAY FOR</h3>
      </div>

      <div className={cn([merchant_copy.className, "text-2xl"])}>
        <p>ORDER #0001 FOR EDGAR</p>
        <p>{getFormattedDate()}</p>

        <table className="w-full my-3 leading-none">
          <thead>
            <tr className="border-t-2 border-b-2 border-black">
              <th className="text-left">ID</th>
              <th className="text-left w-1/2">ITEM</th>
              <th className="text-right">PRICE</th>
              <th className="text-right">AMT</th>
            </tr>
          </thead>
          <tbody>
            {/* - BEGIN - ITEM ROWS */}
            {items?.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                description={item.description}
                price={item.price}
                amt={item.amount}
                signalRefresh={toggleRefresh}
              />
            ))}
            {/* - END - ITEM ROWS */}
            <NewItem />
            <tr className="border-t-2 border-black">
              <td colSpan={2} className="text-left">
                ITEM COUNT:
              </td>
              <td colSpan={2} className="text-right">
                10
              </td>
            </tr>
            <tr className="border-b-2 border-black">
              <td colSpan={2} className="text-left">
                TOTAL:
              </td>
              <td colSpan={2} className="text-right">
                $10
              </td>
            </tr>
          </tbody>
        </table>

        <p>CARD #: **** **** **** 2021</p>
        <p>AUTH CODE: 123456</p>
        <p>CARDHOLDER: EDGAR</p>

        <div className="flex flex-col items-center">
          <p className="py-4">REMEMBER TO PAY YOUR DEBTS!</p>
          <Image src={barcode} alt="barcode" className="w-2/3" />
          <p>{hostname}</p>
        </div>
      </div>
    </div>
  );
}
