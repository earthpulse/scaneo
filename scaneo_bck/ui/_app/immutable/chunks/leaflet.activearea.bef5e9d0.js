(function(c){typeof c>"u"&&(c={getCenter:L.Map.prototype.getCenter,setView:L.Map.prototype.setView,flyTo:L.Map.prototype.flyTo,setZoomAround:L.Map.prototype.setZoomAround,getBoundsZoom:L.Map.prototype.getBoundsZoom,PopupAdjustPan:L.Popup.prototype._adjustPan,RendererUpdate:L.Renderer.prototype._update}),L.Map.include({getBounds:function(){if(this._viewport)return this.getViewportLatLngBounds();var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new L.LatLngBounds(e,i)},getViewport:function(){return this._viewport},getViewportBounds:function(){var t=this._viewport,e=L.point(t.offsetLeft,t.offsetTop),i=L.point(t.clientWidth,t.clientHeight);return(i.x===0||i.y===0)&&(t=this.getContainer(),t&&(e=L.point(0,0),i=L.point(t.clientWidth,t.clientHeight))),L.bounds(e,e.add(i))},getViewportLatLngBounds:function(){var t=this.getViewportBounds();return L.latLngBounds(this.containerPointToLatLng(t.min),this.containerPointToLatLng(t.max))},getOffset:function(){var t=this.getSize().divideBy(2),e=this.getViewportBounds().getCenter();return t.subtract(e)},getCenter:function(t){var e=c.getCenter.call(this);if(this.getViewport()&&!t){var i=this.getZoom(),o=this.project(e,i);o=o.subtract(this.getOffset()),e=this.unproject(o,i)}return e},setView:function(t,e,i){if(t=L.latLng(t),e=e===void 0?this._zoom:this._limitZoom(e),this.getViewport()){var o=this.project(t,this._limitZoom(e));o=o.add(this.getOffset()),t=this.unproject(o,this._limitZoom(e))}return c.setView.call(this,t,e,i)},flyTo:function(t,e,i){if(t=L.latLng(t),e=e===void 0?l:e,this.getViewport()){var o=this.project(t,this._limitZoom(e));o=o.add(this.getOffset()),t=this.unproject(o,this._limitZoom(e))}if(i=i||{},i.animate===!1||!L.Browser.any3d)return this.setView(t,e,i);this._stop();var n=this.project(c.getCenter.call(this)),p=this.project(t),r=this.getSize(),l=this._zoom,h=Math.max(r.x,r.y),m=h*this.getZoomScale(l,e),f=p.distanceTo(n)||1,s=1.42,a=s*s;function _(u){var w=u?-1:1,A=u?m:h,S=m*m-h*h+w*a*a*f*f,b=2*A*a*f,x=S/b,T=Math.sqrt(x*x+1)-x,U=T<1e-9?-18:Math.log(T);return U}function g(u){return(Math.exp(u)-Math.exp(-u))/2}function v(u){return(Math.exp(u)+Math.exp(-u))/2}function y(u){return g(u)/v(u)}var d=_(0);function P(u){return h*(v(d)/v(d+s*u))}function V(u){return h*(v(d)*y(d+s*u)-g(d))/a}function M(u){return 1-Math.pow(1-u,1.5)}var C=Date.now(),Z=(_(1)-d)/s,j=i.duration?1e3*i.duration:1e3*Z*.8;function B(){var u=(Date.now()-C)/j,w=M(u)*Z;u<=1?(this._flyToFrame=L.Util.requestAnimFrame(B,this),this._move(this.unproject(n.add(p.subtract(n).multiplyBy(V(w)/f)),l),this.getScaleZoom(h/P(w),l),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}return this._moveStart(!0,i.noMoveStart),B.call(this),this},setZoomAround:function(t,e,i){var o=this.getViewport();if(o){var n=this.getZoomScale(e),p=this.getViewportBounds().getCenter(),r=t instanceof L.Point?t:this.latLngToContainerPoint(t),l=r.subtract(p).multiplyBy(1-1/n),h=this.containerPointToLatLng(p.add(l));return this.setView(h,e,{zoom:i})}else return c.setZoomAround.call(this,t,e,i)},getBoundsZoom:function(t,e,i){t=L.latLngBounds(t),i=L.point(i||[0,0]);var o=this.getZoom()||0,n=this.getMinZoom(),p=this.getMaxZoom(),r=t.getNorthWest(),l=t.getSouthEast(),h=this.getViewport(),m=(h?L.point(h.clientWidth,h.clientHeight):this.getSize()).subtract(i),f=this.project(l,o).subtract(this.project(r,o)),s=L.Browser.any3d?this.options.zoomSnap:1,a=m.x/f.x,_=m.y/f.y,g=e?Math.max(a,_):Math.min(a,_);return o=this.getScaleZoom(g,o),s&&(o=Math.round(o/(s/100))*(s/100),o=e?Math.ceil(o/s)*s:Math.floor(o/s)*s),Math.max(n,Math.min(p,o))},setActiveArea:function(t,e,i){var o;if(e&&this._zoom&&(o=this.getCenter()),!this._viewport){var n=this.getContainer();this._viewport=L.DomUtil.create("div",""),n.insertBefore(this._viewport,n.firstChild)}return typeof t=="string"?this._viewport.className=t:L.extend(this._viewport.style,t),o&&this.setView(o,this.getZoom(),{animate:!!i}),this}}),L.Renderer.include({_onZoom:function(){this._updateTransform(this._map.getCenter(!0),this._map.getZoom())},_update:function(){c.RendererUpdate.call(this),this._center=this._map.getCenter(!0)}}),L.GridLayer.include({_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t!==void 0){for(var i in this._levels)i=Number(i),this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(L.DomUtil.remove(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i]);var o=this._levels[t],n=this._map;return o||(o=this._levels[t]={},o.el=L.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),o.el.style.zIndex=e,o.origin=n.project(n.unproject(n.getPixelOrigin()),t).round(),o.zoom=t,this._setZoomTransform(o,n.getCenter(!0),n.getZoom()),L.Util.falseFn(o.el.offsetWidth),this._onCreateLevel(o)),this._level=o,o}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(!0),this._map.getZoom(),e,e)},_update:function(t){var e=this._map;if(e){var i=this._clampZoom(e.getZoom());if(t===void 0&&(t=e.getCenter(!0)),this._tileZoom!==void 0){var o=this._getTiledPixelBounds(t),n=this._pxBoundsToTileRange(o),p=n.getCenter(),r=[],l=this.options.keepBuffer,h=new L.Bounds(n.getBottomLeft().subtract([l,-l]),n.getTopRight().add([l,-l]));if(!(isFinite(n.min.x)&&isFinite(n.min.y)&&isFinite(n.max.x)&&isFinite(n.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var m in this._tiles){var f=this._tiles[m].coords;(f.z!==this._tileZoom||!h.contains(new L.Point(f.x,f.y)))&&(this._tiles[m].current=!1)}if(Math.abs(i-this._tileZoom)>1){this._setView(t,i);return}for(var s=n.min.y;s<=n.max.y;s++)for(var a=n.min.x;a<=n.max.x;a++){var _=new L.Point(a,s);if(_.z=this._tileZoom,!!this._isValidTile(_)){var g=this._tiles[this._tileCoordsToKey(_)];g?g.current=!0:r.push(_)}}if(r.sort(function(y,d){return y.distanceTo(p)-d.distanceTo(p)}),r.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var v=document.createDocumentFragment();for(a=0;a<r.length;a++)this._addTile(r[a],v);this._level.el.appendChild(v)}}}}}),L.Popup.include({_adjustPan:function(){if(!this._map._viewport)c.PopupAdjustPan.call(this);else{if(!this.options.autoPan)return;this._map._panAnim&&this._map._panAnim.stop();var t=this._map,e=t._viewport,i=this._container.offsetHeight,o=this._containerWidth,n=L.point(e.offsetLeft,e.offsetTop),p=new L.Point(this._containerLeft-n.x,-i-this._containerBottom-n.y);p._add(L.DomUtil.getPosition(this._container));var r=t.layerPointToContainerPoint(p),l=L.point(this.options.autoPanPadding),h=L.point(this.options.autoPanPaddingTopLeft||l),m=L.point(this.options.autoPanPaddingBottomRight||l),f=L.point(e.clientWidth,e.clientHeight),s=0,a=0;r.x+o+m.x>f.x&&(s=r.x+o-f.x+m.x),r.x-s-h.x<0&&(s=r.x-h.x),r.y+i+m.y>f.y&&(a=r.y+i-f.y+m.y),r.y-a-h.y<0&&(a=r.y-h.y),(s||a)&&t.fire("autopanstart").panBy([s,a])}}})})(window.leafletActiveAreaPreviousMethods);
