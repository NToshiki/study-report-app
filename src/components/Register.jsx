import React from "react"

//将来的な拡張に備えてmemo化
export const Register = React.memo(({ onChangeText, inputText, onChangeTime, inputTime, alertError, onClickAdd }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">学習内容</label>
        <input
          type="text"
          onChange={onChangeText}
          value={inputText}
          className="border border-gray-300 rounded px-2 py-1 min-w-[200px] max-w-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">学習時間</label>
        <input
          type="text"
          onChange={onChangeTime}
          value={inputTime}
          className="border border-gray-300 rounded px-2 py-1 min-w-[200px] max-w-sm w-full"
        />
        <span className="ml-2">時間</span>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <p>入力されている学習内容：{inputText}</p>
        <p>入力されている学習時間：{inputTime}時間</p>
      </div>

      <div className="mb-4">
        {alertError.blank && <p className="text-red-500 text-sm">すべての項目を入力してください</p>}
        {alertError.badNum && <p className="text-red-500 text-sm">学習時間は「半角数字の0より大きい値」で入力してください</p>}
      </div>

      <button
        onClick={onClickAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        登録
      </button>

    </>
  )
})