import React, { useMemo } from "react";
import { Items } from "./items";

//memo化によって無駄なレンダリング防止
export const DisplayList = React.memo(({ studyReports, onClickDelete }) => {
  //更新し忘れを除去
  //追加、削除、編集をした際に自動で計算・反映
  const totalTime = useMemo(() => studyReports.reduce((sum, item) => sum + item.time, 0), [studyReports]);
  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">学習記録一覧</h3>
        <p className="mb-4">合計学習時間：{totalTime.toFixed(1)}時間</p>

        <ul className="space-y-2">
          {studyReports.map((report) => (
            <Items key={report.id} report={report} onClickDelete={onClickDelete} />
          ))}
        </ul>
      </div>
    </>
  );
})