/*
 RequireJS text 1.0.8 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
 */
(function() {
	var k = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], m = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, n = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, i = typeof location !== "undefined" && location.href, o = i && location.protocol && location.protocol.replace(/\:/, ""), p = i && location.hostname, q = i && (location.port ||
	void 0), j = [];
	define(function() {
		var e, l;
		e = {
			version : "1.0.8",
			strip : function(a) {
				if (a) {
					var a = a.replace(m, ""), c = a.match(n);
					c && ( a = c[1])
				} else
					a = "";
				return a
			},
			jsEscape : function(a) {
				return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
			},
			createXhr : function() {
				var a, c, b;
				if ( typeof XMLHttpRequest !== "undefined")
					return new XMLHttpRequest;
				else if ( typeof ActiveXObject !== "undefined")
					for ( c = 0; c < 3; c++) {
						b = k[c];
						try {
							a = new ActiveXObject(b)
						} catch(f) {
						}
						if (a) {
							k = [b];
							break
						}
					}
				return a
			},
			parseName : function(a) {
				var c = !1, b = a.indexOf("."), f = a.substring(0, b), a = a.substring(b + 1, a.length), b = a.indexOf("!");
				b !== -1 && ( c = a.substring(b + 1, a.length), c = c === "strip", a = a.substring(0, b));
				return {
					moduleName : f,
					ext : a,
					strip : c
				}
			},
			xdRegExp : /^((\w+)\:)?\/\/([^\/\\]+)/,
			useXhr : function(a, c, b, f) {
				var d = e.xdRegExp.exec(a), g;
				if (!d)
					return !0;
				a = d[2];
				d = d[3];
				d = d.split(":");
				g = d[1];
				d = d[0];
				return (!a || a === c) && (!d || d === b) && (!g && !d || g === f)
			},
			finishLoad : function(a, c, b, f, d) {
				b = c ? e.strip(b) : b;
				d.isBuild && (j[a] = b);
				f(b)
			},
			load : function(a, c, b, f) {
				if (f.isBuild && !f.inlineText)
					b();
				else {
					var d = e.parseName(a), g = d.moduleName + "." + d.ext, h = c.toUrl(g), r = f && f.text && f.text.useXhr || e.useXhr;
					!i || r(h, o, p, q) ? e.get(h, function(c) {
						e.finishLoad(a, d.strip, c, b, f)
					}) : c([g], function(a) {
						e.finishLoad(d.moduleName + "." + d.ext, d.strip, a, b, f)
					})
				}
			},
			write : function(a, c, b) {
				if (j.hasOwnProperty(c)) {
					var f = e.jsEscape(j[c]);
					b.asModule(a + "!" + c, "define(function () { return '" + f + "';});\n")
				}
			},
			writeFile : function(a, c, b, f, d) {
				var c = e.parseName(c), g = c.moduleName + "." + c.ext, h = b.toUrl(c.moduleName + "." + c.ext) + ".js";
				e.load(g, b, function() {
					var b = function(a) {
						return f(h, a)
					};
					b.asModule = function(a, b) {
						return f.asModule(a, h, b)
					};
					e.write(a, g, b, d)
				}, d)
			}
		};
		if (e.createXhr())
			e.get = function(a, c) {
				var b = e.createXhr();
				b.open("GET", a, !0);
				b.onreadystatechange = function() {
					b.readyState === 4 && c(b.responseText)
				};
				b.send(null)
			};
		else if ( typeof process !== "undefined" && process.versions && process.versions.node)
			l = require.nodeRequire("fs"), e.get = function(a, c) {
				var b = l.readFileSync(a, "utf8");
				b.indexOf("\ufeff") === 0 && ( b = b.substring(1));
				c(b)
			};
		else if ( typeof Packages !== "undefined")
			e.get = function(a, c) {
				var b = new java.io.File(a), f = java.lang.System.getProperty("line.separator"), b = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(b), "utf-8")), d, e, h = "";
				try {
					d = new java.lang.StringBuffer;
					( e = b.readLine()) && e.length() && e.charAt(0) === 65279 && ( e = e.substring(1));
					for (d.append(e); ( e = b.readLine()) !== null; )
						d.append(f), d.append(e);
					h = String(d.toString())
				} finally {
					b.close()
				}
				c(h)
			};
		return e
	})
})();
