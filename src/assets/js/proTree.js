(function($) {
			var Tree = function(element, options) {
				this.element = element;
				//json数组
				this.JSONArr = options.arr;
				//单个文件图标
				this.simIcon = options.simIcon || "";
				//闭合
				this.close = options.close || false;
				//多个文件打开图标
				this.mouIconOpen = options.mouIconOpen || "fa fa-folder-open-o";
				//多个文件关闭图标
				this.mouIconClose = options.mouIconClose || "fa fa-folder-o";
				//回调函数
				this.callback = options.callback || function() {};
				//初始化
				this.init();

			}
			//初始化事件
			Tree.prototype.init = function() {
				var self = this;
				//事件
				this.JSONTreeArr = this.proJSON(this.JSONArr, 0);
				this.treeHTML = this.proHTML(this.JSONTreeArr);
				this.element.append(this.treeHTML);
				if(this.close){
				//闭合
				this.element.children(".menuUl").find("li").children(".menuUl").hide();
				var i_arr = this.element.children(".menuUl").find("li").find('i');
				i_arr.each(function(index,item){
					if($(item).attr('ischek')){
						$(item).attr("ischek",'false');
					    $(item).removeClass(self.mouIconOpen).addClass(self.mouIconClose)
					}
				})
				}
				this.bindEvent();
			}
			//生成树形JSON数据
			Tree.prototype.proJSON = function(oldArr, menuParId) {
				var newArr = [];
				var self = this;
				oldArr.map(function(item) {
					if(item.menuParId == menuParId) {
						var obj = {
							menuId: item.menuId,
							menuName: item.menuName
						}
						var child = self.proJSON(oldArr, item.menuId);
						if(child.length > 0) {
							obj.child = child
						}
						newArr.push(obj)
					}

				})
				return newArr;

			};
			//生成树形HTML
			Tree.prototype.proHTML = function(arr) {
				var ulHtml = "<ul class='menuUl'>";
				var self = this;
				arr.map(function(item) {
					var lihtml = "<li style='list-style:none; margin-top: 10px; cursor: pointer; font-size:15px;'>";
					if(item.child && item.child.length > 0) {
						lihtml += "<i ischek='true' class='" + self.mouIconOpen + "'></i>" +
							"&nbsp;<span id='" + item.id + "'>" + item.menuName + "</span>"
						var _ul = self.proHTML(item.child);
						lihtml += _ul + "</li>";
					} else {
						lihtml += "<i class='" + self.simIcon + "'></i>" +
							"&nbsp;<span id='" + item.id + "'>" + item.menuName + "</span>";
					}
					ulHtml += lihtml;
				})
				ulHtml += "</ul>";
				return ulHtml;
			}
			Tree.prototype.bindEvent = function() {
				var self = this;
				this.element.find(".menuUl li i").click(function() {
					var ischek = $(this).attr("ischek");
					if(ischek == 'true') {
						var menuUl = $(this).closest("li").children(".menuUl");
						$(this).removeClass(self.mouIconOpen).addClass(self.mouIconClose)
						menuUl.hide();
						$(this).attr("ischek", 'false');
					} else if(ischek == 'false') {
						var menuUl = $(this).closest("li").children(".menuUl");
						menuUl.show();
						$(this).removeClass(self.mouIconClose).addClass(self.mouIconOpen)
						$(this).attr("ischek", 'true')
					}
				});

				this.element.find(".menuUl li span").click(function() {
					var menuId = $(this).attr("id");
					var menuName = $(this).text();
					self.callback(menuId, menuName)
				})
			}
			//给jquery对象拓展一个树形对象
			$.fn.extend({
				ProTree: function(options) {
					return new Tree($(this), options)
				}
			})
		})(jQuery);