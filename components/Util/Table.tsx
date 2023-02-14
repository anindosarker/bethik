import React from "react";

export default function Table({ tableData }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Email
            </th>

            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Contribution
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tableData.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {item.email}{" "}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {item.edit_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
