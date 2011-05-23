SelectionRange = function(textinput) {
	textinput.getTextSelection = function() {
		var e = textinput;
		return (
			('selectionStart' in e && function() {
				var l = e.selectionEnd - e.selectionStart;
				return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
			}) ||
			(document.selection && function() {
				e.focus();
				var r = document.selection.createRange();
				if (r == null) {
					return { start: 0, end: e.value.length, length: 0 }
				}
				var re = e.createTextRange();
				var rc = re.duplicate();
				re.moveToBookmark(r.getBookmark());
				rc.setEndPoint('EndToStart', re);

				return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
			}) ||
			/* browser not supported */
			function() {
				return { start: 0, end: e.value.length, length: 0 };
			}
		)();
	};
  textinput.selectText = function(start, len) {
		var e = textinput;
		e.focus();
		(
			('selectionStart' in e && function() {
			  e.setSelectionRange(start, start + len);
			}) ||
			(document.selection && function() {
				var range = e.createTextRange();
				range.collapse(true);
				range.moveStart('character', start);
				range.moveEnd('character', len);
				range.select();
			}) ||
			function() {
			  e.select();
			}
		)();
		return this;
	};
	textinput.insertText = function() {
		var e = textinput;
		var text = arguments[0] || '';
		return (
			('selectionStart' in e && function() {
				e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
				return this;
			}) ||
			(document.selection && function() {
				e.focus();
				document.selection.createRange().text = text;
				return this;
			}) ||
			function() {
				e.value += text;
				return this;
			}
		)();
	}

	return textinput;
}
