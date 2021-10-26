<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent scrollable max-width="1000px">
			<v-card>
				<v-toolbar class="primary" dark>
					<v-toolbar-title>Section</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-card-text class="mt-5">
					<v-container>
						<v-row>
							<v-col cols="2">
								<v-select
									v-model="section.Yard"
									:items="yards"
									color="primary"
									item-text="Zone"
									item-value="Zone"
									label="Yard"
									dense
								></v-select>
							</v-col>
							<v-col cols="2">
								<v-select
									v-model="section.Area"
									:items="areas"
									color="primary"
									item-text="Zone"
									item-value="Zone"
									label="Area"
									dense
								></v-select>
							</v-col>
							<v-col cols="2">
								<v-text-field
									label="Id"
									v-model="section.IdZone"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									label="Name"
									v-model="section.Zone"
									dense
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-text-field
									label="Description"
									v-model="section.Description"
									dense
								></v-text-field>
							</v-col>
						</v-row>
						<v-divider></v-divider>
						<v-row>
							<v-col cols="12">
								<v-tabs center-active show-arrows>
									<v-tab>
										<v-icon left>settings</v-icon>Properties
									</v-tab>
									<v-tab-item>
										<v-row>
											<v-col cols="4">
												<div class="mt-5 text-left">
													<label
														class="ml-7 subtitle-1"
														>Background Color</label
													>
													<v-color-picker
														name="color-background"
														v-model="
															section.ColorBackground
														"
														mode="hexa"
														class="ma-2"
													></v-color-picker>
												</div>
											</v-col>
											<v-col cols="4">
												<div class="mt-5 text-left">
													<label
														class="ml-7 subtitle-1"
														>Foreground Color</label
													>
													<v-color-picker
														name="color-background"
														v-model="
															section.ColorForeground
														"
														mode="hexa"
														class="ma-2"
													></v-color-picker>
												</div>
											</v-col>
											<v-col cols="4">
												<div class="mt-5 text-left">
													<label
														class="ml-7 subtitle-1"
														>Frame Color</label
													>
													<v-color-picker
														name="color-background"
														v-model="
															section.ColorFrame
														"
														mode="hexa"
														class="ma-2"
													></v-color-picker>
												</div>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="4">
												<v-row>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosXMin
															"
															type="number"
															label="Pos X Min"
															dense
														></v-text-field>
													</v-col>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosXMax
															"
															type="number"
															label="Pos X Max"
															dense
														></v-text-field>
													</v-col>
												</v-row>
												<v-row
													class="mt-0 mb-0 pt-0 pb-0"
												>
													<v-col
														cols="6"
														offset="3"
														class="
															mt-0
															mb-0
															pt-0
															pb-0
														"
													>
														Width: {{ width }}
													</v-col>
												</v-row>
											</v-col>

											<v-col cols="4">
												<v-row>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosYMin
															"
															type="number"
															label="Pos Y Min"
															dense
														></v-text-field>
													</v-col>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosYMax
															"
															type="number"
															label="Pos Y Max"
															dense
														></v-text-field>
													</v-col>
												</v-row>
												<v-row
													class="mt-0 mb-0 pt-0 pb-0"
												>
													<v-col
														cols="6"
														offset="3"
														class="
															mt-0
															mb-0
															pt-0
															pb-0
														"
													>
														Length: {{ length }}
													</v-col>
												</v-row>
											</v-col>

											<v-col cols="4">
												<v-row>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosZMin
															"
															type="number"
															label="Pos Z Min"
															dense
														></v-text-field>
													</v-col>
													<v-col cols="6">
														<v-text-field
															v-model="
																section.PosZMax
															"
															type="number"
															label="Pos Z Max"
															dense
														></v-text-field>
													</v-col>
												</v-row>
												<v-row
													class="mt-0 mb-0 pt-0 pb-0"
												>
													<v-col
														cols="6"
														offset="3"
														class="
															mt-0
															mb-0
															pt-0
															pb-0
														"
													>
														Height: {{ height }}
													</v-col>
												</v-row>
											</v-col>
										</v-row>
									</v-tab-item>
									<v-tab>
										<v-icon left
											>settings_input_component</v-icon
										>Advanced
									</v-tab>
									<v-tab-item>
										<v-row class="mt-5">
											<v-col cols="6">
												<v-text-field
													v-model="section.OffsetX"
													type="number"
													label="Offset X"
													dense
												></v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													v-model="section.OffsetY"
													type="number"
													label="Offset Y"
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="4">
												<v-text-field
													v-model="
														section.CameraOffsetX
													"
													type="number"
													label="Camera Offset X"
													dense
												></v-text-field>
											</v-col>
											<v-col cols="4">
												<v-text-field
													v-model="
														section.CameraOffsetY
													"
													type="number"
													label="Camera Offset Y"
													dense
												></v-text-field>
											</v-col>
											<v-col cols="4">
												<v-text-field
													v-model="
														section.CameraOffsetZ
													"
													type="number"
													label="Camera Offset Z"
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6">
												<v-text-field
													v-model="
														section.CameraAngleXy
													"
													type="number"
													label="Camera Angle XY"
													dense
												></v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													v-model="
														section.CameraAngleYz
													"
													type="number"
													label="Camera Angle YZ"
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="6">
												<v-text-field
													v-model="section.MaxStress"
													type="number"
													label="Maximum Stress"
													dense
												></v-text-field>
											</v-col>
											<v-col cols="6">
												<v-text-field
													v-model="section.MaxHeight"
													type="number"
													label="Maximum Height"
													dense
												></v-text-field>
											</v-col>
										</v-row>
									</v-tab-item>
								</v-tabs>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="secondary white--text"
						text
						@click="cancelSectionEdition"
						>Cancel</v-btn
					>
					<v-btn
						color="secondary white--text"
						text
						@click="saveSection"
						>Save</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computed = mapState("yard", {
	dialog: (state) => state.showSectionEdition,
	section: (state) => state.editingSection,
	yards: (state) => state.yards,
	areas: (state) => state.areas,
	width: (state) =>
		state.editingSection.PosXMax - state.editingSection.PosXMin,
	length: (state) =>
		state.editingSection.PosYMax - state.editingSection.PosYMin,
	height: (state) =>
		state.editingSection.PosZMax - state.editingSection.PosZMin,
});

const methods = mapActions("yard", ["cancelSectionEdition", "saveSection"]);

export default {
	data() {
		return {};
	},
	computed,
	methods,
};
</script>

<style>
</style>