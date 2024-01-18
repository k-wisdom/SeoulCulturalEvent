import { useEffect, useRef, useState } from 'react';
import API from '../utils/API';
import { dateParseNumber, getToday } from '../utils/Date';

export default function useData() {
  const limit = 1000; //한번에 가져올 데이터 수
  const dataRef = useRef<object[]>([]);
  const dataStateRef = useRef(null);
  const [timeData, setTimeData] = useState<object[]>([]);

  const getDataByDate = async () => {
    let repeat = 1;
    let repeatCnt = 0;

    if (dataRef.current.length === 0)
      for (let i = 0; i < repeat; i++) {
        const startIndex = repeatCnt * limit + 1;
        const endIndex = (repeatCnt + 1) * limit;

        const { data } = await API.get(`/${startIndex}/${endIndex}`);
        JSON.stringify(data);

        const resultCode = data.RESULT?.CODE || data.culturalEventInfo?.RESULT.CODE;

        if (resultCode === 'INFO-000') {
          //정상처리
          const eventData = data.culturalEventInfo.row;
          const listTotalCnt = data.culturalEventInfo.list_total_count;

          repeat = Math.ceil(listTotalCnt / limit);

          if (repeatCnt < repeat - 1) {
            repeatCnt = repeatCnt + 1;
          }

          dataRef.current = [...dataRef.current, ...eventData];
          dataStateRef.current = resultCode;
        } else if (resultCode === 'ERROR-500') {
          //서버오류
          dataStateRef.current = resultCode;
          return;
        }
      }

    getTimeData();
  };

  useEffect(() => {
    getDataByDate();
  }, []);

  type time = 'upcomming' | 'ongoing' | 'end';
  const today = dateParseNumber(getToday());

  const getTimeEvent = (t: time) => {
    const data = dataRef.current;
    const result = data.filter(({ STRTDATE, END_DATE }: any) => {
      const startDate = dateParseNumber(STRTDATE.substring(0, 10));
      const endDate = dateParseNumber(END_DATE.substring(0, 10));

      switch (t) {
        case 'upcomming':
          return startDate > today;
        case 'ongoing':
          return startDate <= today && endDate >= today;
        case 'end':
          return endDate < today;
        default:
          return data;
      }
    });
    return result;
  };

  const getTimeData = () => {
    if (dataRef.current === null) {
      return;
    }
    const timeDataList: any = {};
    timeDataList.upcomming = getTimeEvent('upcomming');
    timeDataList.ongoing = getTimeEvent('ongoing');
    timeDataList.end = getTimeEvent('end');
    setTimeData(timeDataList);
  };

  return [timeData, dataStateRef.current];
}
