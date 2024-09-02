import { useCallback, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

interface RequestState<T> {
  isPending: boolean;
  success : boolean;
  error: string;
  data: T | null;
}

type UseAxiosReturn<T> = [RequestState<T>, (...args: any[]) => Promise<void>];

/** 用于判断远程获取的状态 */
export function useService<T>(requestFn: (...args: any[]) => Promise<AxiosResponse<T>>): UseAxiosReturn<T> {
  const [state, setState] = useState<RequestState<T>>({
    isPending: false,
    success : false,
    error: '',
    data: null,
  });

  const triggerRequest = useCallback(async (...args: any[]) => {
    setState({ ...state , isPending : true });
    try {
      const response = await requestFn(...args);
      setState({
        ...state,
        success:true,
        isPending:false,
        data:response.data
      })
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      setState({ isPending: false, error: errorMessage, data: null , success : false});
    }
  }, [requestFn, state]);

  return [state, triggerRequest];
}

