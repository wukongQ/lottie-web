function CVVideoElement(data, globalData, comp){
  this.assetData = globalData.getAssetData(data.refId);
  this.video = globalData.imageLoader.getImage(this.assetData);
  this.initElement(data,globalData,comp);
}
extendPrototype([CVImageElement], CVVideoElement);

CVVideoElement.prototype.createContent = function(){

  var canvas = createTag('canvas');
  canvas.width = this.assetData.w;
  canvas.height = this.assetData.h;
  var ctx = canvas.getContext('2d');
  var _this = this
  console.log(this.video, '---CVVideoElement')
  function renderVideo(){
    if (_this.video) {
      window.requestAnimationFrame(renderVideo);
      ctx.drawImage(_this.video,0,0);
    }
  }
  this.video.play()
  renderVideo()
  this._lastFrameCanvas = canvas;
};

CVVideoElement.prototype.renderInnerContent = function(parentMatrix){
  this.canvasContext.drawImage(this._lastFrameCanvas, 0, 0);
};

CVVideoElement.prototype.destroy = function(){
  this.video.pause();
  this.video = null;
};