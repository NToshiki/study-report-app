import React from "react"

export const Items = React.memo(({ report, onClickDelete }) => {
  return (
    <li className="flex justify-between items-center border-b pb-1">
      <button
        onClick={() => onClickDelete(report.id)}
        className="text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition mr-2"
      >
        ✕
      </button>
      <span className="flex-1 text-gray-800">{report.title}</span>
      <span className="text-gray-600 text-sm mr-10">{report.time}時間</span>
    </li>
  )
})