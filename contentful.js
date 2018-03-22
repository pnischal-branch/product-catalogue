const contentfulClient = contentful.createClient({
	accessToken:
		'a5928e816edc7addfa4298669bd534f83b8cd907b920511b7d2f86f0d5b3e270',
	space: '2q1fpqwpgegt'
});

const PRODUCT_CONTENT_TYPE_ID = '2PqfXUJwE8qSYKuM0U6w8M';

document.addEventListener('DOMContentLoaded', event => {
	const container = document.getElementById('content');
	contentfulClient
		.getEntries({
			content_type: PRODUCT_CONTENT_TYPE_ID
		})
		.then(entries => {
			container.innerHTML = renderProducts(entries.items);
		});
});

const renderProducts = products =>
	`<div class="products row">
		${products.map(renderSingleProduct).join('\n')}
		</div>`;

const renderSingleProduct = product => {
	const fields = product.fields;
	return `<div class="col-md-4 col-sm-6">
		<div class="product-in-list card mb-4 box-shadow">
		<div class="product-image card-img-top">
		${renderImage(fields.image[0], fields.slug)}
		</div>
		<div class="product-details card-body">
		${renderProductDetails(fields)}
		</div>
		</div>
		</div>`;
};

const renderProductDetails = fields =>
	`${renderProductHeader(fields)}
		<p class="product-categories">
		${fields.categories.map(category => category.fields.title).join(', ')}
		</p>
		${marked(fields.productDescription)}
		<p class="priceText">
		${fields.price}
		&euro;</p>
		<p><button type="button" class="btn btn-light">BUY NOW</button></p>`;

const renderProductHeader = fields =>
	`<div class="product-header">
		<h2>
		${fields.productName}
		</a>
		</h2>
		by ${fields.brand.fields.companyName}
		</a>
		</div>`;

const renderImage = image =>
	`<div class="image" style="background:url(https:${image.fields.file.url})">
    </div>`;
