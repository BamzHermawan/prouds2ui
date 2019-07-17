<template>
	<section class="columns">
		<div
			class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
		>
			<section class="info">
				<p class="title is-size-5" style="margin-bottom:10px;">
					Business Unit
				</p>
				<b-field style="margin-bottom: 18px;">
					<b-select placeholder="Select Business Unit" expanded>
						<option value="pmo">PMO</option>
						<option value="cdo">CDO</option>
						<option value="bsd">BSD</option>
					</b-select>
				</b-field>
				<b-field style="margin-bottom: 5px;" grouped>
					<b-field label="CPI" label-position="on-border" expanded>
						<b-input readonly value="0.92"></b-input>
					</b-field>
					<b-field label="SPI" label-position="on-border" expanded>
						<b-input readonly value="0.92"></b-input>
					</b-field>
					<b-field expanded>
						<b-dropdown aria-role="list">
							<button class="button is-primary" slot="trigger">
								<span>⚙</span>
								<b-icon icon="menu-down"></b-icon>
							</button>

							<b-dropdown-item aria-role="listitem"
								>Action</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Another action</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Something else</b-dropdown-item
							>
						</b-dropdown>
					</b-field>
				</b-field>
				<b-field>
					<a class="button is-fullwidth">Non-Project</a>
				</b-field>
			</section>

			<section class="info">
				<p class="title is-size-5" style="margin-bottom:10px;">
					New Projects
				</p>
				<hr
					class="has-background-grey-lighter"
					style="margin-top: 5px; margin-bottom: 10px;"
				/>
				<b-field>
					<b-input
						placeholder="Search..."
						type="search"
						icon="magnify"
					>
					</b-input>
				</b-field>
				<article v-for="n in 3" :key="n" class="media">
					<div class="media-content">
						<div class="content">
							<p class="title is-size-6 is-marginless">
								Project Name
							</p>
							<p class="is-marginless">
								<span>P-SCC-XXXA</span>
								<span style="margin-left: 10px;">USD. 300</span>
							</p>
							<p class="is-size-7">AM: Wawan Surnawan, M.T.</p>
						</div>
					</div>
					<div class="media-right">
						<b-dropdown aria-role="list">
							<button
								class="button is-primary is-small"
								slot="trigger"
							>
								<span>⚙</span>
							</button>

							<b-dropdown-item aria-role="listitem"
								>Action</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Another action</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Something else</b-dropdown-item
							>
						</b-dropdown>
					</div>
				</article>
			</section>
		</div>
		<div class="column is-section">
			<section class="main-content">
				<p class="title is-size-3">BU: Project Management Office</p>
				<p class="subtitle is-size-5">📁 Total Project [ 100 ]</p>
			</section>

			<section class="info">
				<nav class="level is-mobile">
					<div class="level-item has-text-centered">
						<div class="box is-level-widget">
							<p class="heading">Behind Schedule</p>
							<p class="title">📁 40</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div class="box is-level-widget">
							<p class="heading">BAST Delay</p>
							<p class="title">📁 20</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div class="box is-level-widget">
							<p class="heading">TOP Delay</p>
							<p class="title">📁 10</p>
						</div>
					</div>
				</nav>
			</section>
		</div>
	</section>
</template>

<script>
export default {};
</script>

