import * as React from 'react';

function SvgRoadmap(props) {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}>
      <path
        d="M14.56 6.722h5.953c.472 0 .708 0 .846.1.12.086.2.22.216.367.02.169-.095.375-.324.788l-1.42 2.557c-.084.15-.125.225-.142.304a.525.525 0 0 0 0 .213c.017.079.058.154.141.303l1.421 2.558c.23.413.344.62.324.788a.528.528 0 0 1-.216.367c-.138.1-.374.1-.846.1H13.08c-.59 0-.886 0-1.112-.115a1.056 1.056 0 0 1-.461-.462c-.115-.226-.115-.521-.115-1.112v-2.534M7.697 21.5 3.476 4.611m1.583 6.333h7.811c.591 0 .887 0 1.113-.115.198-.1.36-.262.461-.46.115-.227.115-.522.115-1.113V4.189c0-.591 0-.887-.115-1.113a1.056 1.056 0 0 0-.461-.46c-.226-.116-.522-.116-1.113-.116H5.111c-.737 0-1.106 0-1.358.153a1.056 1.056 0 0 0-.462.59c-.087.283.003.64.182 1.356l1.586 6.345Z"
        stroke="currentColor"
      />
    </svg>
  );
}
export default SvgRoadmap;
