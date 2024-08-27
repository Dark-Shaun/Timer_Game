import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
// utilizing the forwardRef whihc will aloow me to move the refs to the children that is from resultmodal to the Time challengers
// Referred this documentation- (https://react.dev/reference/react/forwardRef)
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  // use the below hook to customize the handle exposed as a ref
  // referred to this documentation- (https://react.dev/reference/react/useImperativeHandle)
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  // return create portal utilized the createPortal in React API to make sure this can be used for dialogue to appear
  // Check the createPortal here (https://react.dev/reference/react-dom/createPortal)
  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
