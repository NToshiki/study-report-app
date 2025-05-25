import { useCallback, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Register } from "./components/Register";
import { DisplayList } from "./components/DisplayList";
import { fetchReports, addReports, deleteReports } from "./supabase";

export const App = () => {
  //文字列で管理、登録の際にnumに変換
  //''や'-'をそのまま持てる・stateにNaNが入らない・判定が楽
  const [inputTime, setInputTime] = useState('');
  const [inputText, setInputText] = useState('');

  const [studyReports, setStudyReports] = useState([]);
  const [alertError, setAlertError] = useState({ blank: false, badNum: false });

  useEffect(() => {
    const loadReports = async () => {
      const reports = await fetchReports();
      setStudyReports(reports);
    };
    loadReports();
  }, []);



  //useCallbackによって無駄な関数の生成を防ぐ
  //stateの変更ごとにResisterが再レンダリングされるので現時点での恩恵は小さい

  const onChangeText = useCallback((e) => setInputText(e.target.value), []);

  const onChangeTime = useCallback((e) => setInputTime(e.target.value), []);

  const onClickAdd = useCallback(async () => {
    //trimでスペースのみを弾く
    const num = Number(inputTime);

    if (inputText.trim() === '' || inputTime === '') {
      setAlertError({ blank: true, badNum: false });
      return;
    }

    if (isNaN(num) || num <= 0) {
      setAlertError({ blank: false, badNum: true });
      return;
    }
    const newReport = { id: uuidv4(), title: inputText, time: Number(inputTime) };
    await addReports(newReport);
    const updateReports = await fetchReports(); //同期を取り、ズレ回避
    setStudyReports(updateReports);

    setInputText('');
    setInputTime('');
    setAlertError({ blank: false, badNum: false });
  }, [inputText, inputTime])

  const onClickDelete = async (id) => {
    await deleteReports(id);
    const reports = await fetchReports(); //同期を取り、ズレ回避
    setStudyReports(reports);
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-xl font-bold mb-4">学習記録アプリ</h1>
      <Register onChangeText={onChangeText} inputText={inputText} onChangeTime={onChangeTime} inputTime={inputTime} alertError={alertError} onClickAdd={onClickAdd} />
      <DisplayList studyReports={studyReports} onClickDelete={onClickDelete} />
    </div>
  )
}