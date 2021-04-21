// canvas: 需要转换图片，然后自动下载的 canvas 元素 CSS 选择器
// fileName: 下载的图片名称
export const download = (canvasSelector, fileName = "天书.png") => {
  const canvas = document.querySelector(canvasSelector);
  const imageData = canvas.toDataURL("image/png");

  const aLink = document.createElement("a");
  aLink.style.display = "none";
  aLink.href = imageData;
  aLink.download = fileName;
  // 触发点击-然后移除
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
};
