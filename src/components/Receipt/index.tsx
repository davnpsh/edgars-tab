"use client";

import texture from "@/assets/img/wrinkled-paper-texture.jpg";
import barcode from "@/assets/img/barcode.png";
import Image from "next/image";
import { cn, merchant_copy, getFormattedDate } from "@/lib/utils";

export default function Receipt() {
  return (
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
              <th className="text-left">QTY</th>
              <th className="text-left w-1/2">ITEM</th>
              <th className="text-right">COST</th>
              <th className="text-right">AMT</th>
            </tr>
          </thead>
          <tbody>
            {/* Example table row:
             <tr>
                <td className="text-left align-top">01</td>
                <td className="text-left align-top">COLLAPSED IADSFHDSOU FNDIFND SUNBEAMS</td>
                <td className="text-right align-top">$30.000.000</td>
                <td className="text-right align-top">20</td>
            </tr> */}
            <tr>
              <td className="text-left align-top">01</td>
              <td className="text-left align-top">
                COLLAPSED IADSFHDSOU FNDIFND SUNBEAMS
              </td>
              <td className="text-right align-top">$30.000.000</td>
              <td className="text-right align-top">20</td>
            </tr>
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
          <p>{window.location.hostname}</p>
        </div>
      </div>
    </div>
  );
}
