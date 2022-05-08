function workLoop(deadline) {
  // 任务执行完毕或超时结束循环
  while (nextUnitOfWork || deadline.timeRemaining > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

}