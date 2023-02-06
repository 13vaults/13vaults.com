import { useRef } from "react";

export default function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current;
  return condition ? initialValue : value;
}
