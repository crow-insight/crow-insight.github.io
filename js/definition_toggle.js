var caret = '<div class="toggleIcon" tabindex="0" href="#void">' +
				'<span class="inner">' +
					'<svg viewBox="0 0 16 16">' +
						'<path d="M8 12.043l7.413-8.087H.587z"></path>' +
					'</svg>' +
				'</span>' +
			'</div>';

//add span with definition
d3.selectAll("span.definition")
	.html(function(d){
		var definitionText = `<span class="definitionText hidden"> ${d3.select(this).attr("definition")} </span>`;
		var current = `<span style="text-decoration: underline;"> ${d3.select(this).html()}</span>`;
		return current + caret + definitionText;
	});

d3.selectAll(".toggleIcon")
		.on("click",function(d){
			var definitionText = d3.select(this.closest(".definition")).select(".definitionText");
			definitionText.classed("hidden", definitionText.classed("hidden") ? false : true);
			
		});

d3.selectAll(".toggleIcon")
.on("keydown",function(e){
	var key = e.which;
	if (key == 13){
		this.click()
	}
});