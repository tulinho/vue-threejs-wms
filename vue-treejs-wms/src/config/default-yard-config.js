export default {
	serviceUrl: "http://localhost:8081/YardService.svc",
	yard: {
		YardType: "S",
		IdZone: 0,
		Zone: null,
		ZoneType: "Y",
		Yard: null,
		Area: null,
		Section: null,
		Status: 0,
		ColorBackground: "#F0F8FFFF",
		ColorForeground: "#868686FF",
		ColorFrame: "#868686FF",
		PosXMin: 12000,
		PosXMax: 432001,
		PosYMin: 0,
		PosYMax: 135001,
		PosZMin: 0,
		PosZMax: 10000,
		Description: null,
		IdZonePrevX: null,
		IdZonePrevY: null,
		IdZonePrevZ: null,
		OffsetX: 0,
		OffsetY: 0,
		CameraOffsetX: 0,
		CameraOffsetY: 0,
		CameraOffsetZ: 0,
		CameraAngleXy: 0,
		CameraAngleYz: 0,
		PieceCountMax: 1,
		Priority: 5,
		XAlignment: 2,
		YAlignment: 2,
		RotateAngle: 0,
		TiltAngle: 0,
		GenEventEnter: true,
		GenEventExit: true,
		ModifLast: "2020-01-28T13:09:41.109",
		MaxStress: 3000,
		MaxHeight: 2500,
	},
	area: {
		IdZone: 100000000,
		Zone: null,
		ZoneType: "A",
		Yard: null,
		Area: null,
		Section: null,
		Status: 0,
		ColorBackground: "#868686FF",
		ColorForeground: "#000000FF",
		ColorFrame: "#000000FF",
		PosXMin: 72001,
		PosXMax: 228000,
		PosYMin: 99001,
		PosYMax: 135000,
		PosZMin: 0,
		PosZMax: 1250,
		Description: null,
		IdZonePrevX: null,
		IdZonePrevY: null,
		IdZonePrevZ: null,
		OffsetX: 0,
		OffsetY: 0,
		CameraOffsetX: 0,
		CameraOffsetY: 0,
		CameraOffsetZ: 0,
		CameraAngleXy: 0,
		CameraAngleYz: 0,
		PieceCountMax: 10,
		Priority: 5,
		XAlignment: 2,
		YAlignment: 2,
		RotateAngle: 0,
		TiltAngle: 0,
		GenEventEnter: true,
		GenEventExit: true,
		ModifLast: "2020-10-29T17:32:02.405",
		MaxStress: 3000,
		MaxHeight: 2500,
	},
	section: {
		IdZone: 100100000,
		Zone: null,
		ZoneType: "S",
		Yard: null,
		Area: null,
		Section: null,
		Status: 10,
		ColorBackground: "#00008BFF",
		ColorForeground: "#FFFFFFFF",
		ColorFrame: "#FFFFFFFF",
		PosXMin: 211092,
		PosXMax: 297492,
		PosYMin: 75250,
		PosYMax: 93553,
		PosZMin: 0,
		PosZMax: 10000,
		Description: null,
		IdZonePrevX: null,
		IdZonePrevY: null,
		IdZonePrevZ: null,
		OffsetX: 0,
		OffsetY: 0,
		CameraOffsetX: 0,
		CameraOffsetY: 0,
		CameraOffsetZ: 0,
		CameraAngleXy: 0,
		CameraAngleYz: 0,
		PieceCountMax: 1,
		Priority: 5,
		XAlignment: 0,
		YAlignment: 0,
		RotateAngle: 0,
		TiltAngle: 0,
		GenEventEnter: true,
		GenEventExit: true,
		ModifLast: "2020-03-09T12:08:00.508",
		MaxStress: 3000,
		MaxHeight: 2500,
	},
	zone: {
		IdZone: 0,
		Zone: "",
		ZoneType: "Z",
		Yard: "",
		Area: "",
		Section: "",
		Status: 0,
		ColorBackground: "#104E8BFF",
		ColorForeground: "#FFFFFFFF",
		ColorFrame: "#00008BFF",
		PosXMin: 43600,
		PosXMax: 44599,
		PosYMin: 2897,
		PosYMax: 4097,
		PosZMin: 0,
		PosZMax: 1250,
		Description: null,
		IdZonePrevX: null,
		IdZonePrevY: null,
		IdZonePrevZ: null,
		CameraOffsetX: 0,
		CameraOffsetY: 0,
		CameraOffsetZ: 0,
		CameraAngleXy: 0,
		CameraAngleYz: 0,
		PieceCountMax: 1,
		Priority: 5,
		XAlignment: 2,
		YAlignment: 2,
		RotateAngle: 0,
		TiltAngle: 0,
		GenEventEnter: 1,
		GenEventExit: 1,
		ModifLast: "2020-10-29T17:32:02.265",
		MaxStress: 3000,
		MaxHeight: 2500,
	},
	InsertYardScript:
		"Insert into SYM.TRACK_YARD (YARD,YARD_TYPE,DESCRIPTION,OFFSET_X,OFFSET_Y,CAMERA_OFFSET_X,CAMERA_OFFSET_Y,CAMERA_OFFSET_Z,CAMERA_ANGLE_XY,CAMERA_ANGLE_YZ) values ('{0}','{1}','{2}',{3},{4},{5},{6},{7},{8},{9});",
	InsertAreaScript:
		"Insert into SYM.TRACK_AREA (AREA,YARD,DESCRIPTION,OFFSET_X,OFFSET_Y,CAMERA_OFFSET_X,CAMERA_OFFSET_Y,CAMERA_OFFSET_Z,CAMERA_ANGLE_XY,CAMERA_ANGLE_YZ) values ('{0}','{1}','{2}',{3},{4},{5},{6},{7},{8},{9});",
	InsertSectionScript:
		"Insert into SYM.TRACK_SECTION (SECTION,YARD,AREA,DESCRIPTION,OFFSET_X,OFFSET_Y,CAMERA_OFFSET_X,CAMERA_OFFSET_Y,CAMERA_OFFSET_Z,CAMERA_ANGLE_XY,CAMERA_ANGLE_YZ) values ('{0}','{1}','{2}','{3}',{4},{5},{6},{7},{8},{9},{10});",
	InsertZoneScript:
		"Insert into SYM.TRACK_ZONE (ID_ZONE,ZONE,ZONE_TYPE,YARD,AREA,SECTION,STATUS,COLOR_BACKGROUND,COLOR_FOREGROUND,COLOR_FRAME,POS_X_MIN,POS_X_MAX,POS_Y_MIN,POS_Y_MAX,POS_Z_MIN,POS_Z_MAX,DESCRIPTION,ID_ZONE_PREV_X,ID_ZONE_PREV_Y,ID_ZONE_PREV_Z,CAMERA_OFFSET_X,CAMERA_OFFSET_Y,CAMERA_OFFSET_Z,CAMERA_ANGLE_XY,CAMERA_ANGLE_YZ,PIECE_COUNT_MAX,PRIORITY,X_ALIGNMENT,Y_ALIGNMENT,ROTATE_ANGLE,TILT_ANGLE,GEN_EVENT_ENTER,GEN_EVENT_EXIT,MAX_STRESS,MAX_HEIGHT) values ({0},'{1}','{2}','{3}',{4},{5},{6},'{7}','{8}','{9}',{10},{11},{12},{13},{14},{15},'{16}',{17},{18},{19},{20},{21},{22},{23},{24},{25},{26},{27},{28},{29},{30},{31},{32},{33},{34});",
	UpdateYardScript:
		"UPDATE SYM.TRACK_YARD SET YARD_TYPE = '{1}', DESCRIPTION = '{2}', OFFSET_X = {3}, OFFSET_Y = {4}, CAMERA_OFFSET_X = {5}, CAMERA_OFFSET_Y = {6}, CAMERA_OFFSET_Z = {7}, CAMERA_ANGLE_XY = {8}, CAMERA_ANGLE_YZ = {9} WHERE YARD = '{0}';",
	UpdateAreaScript:
		"UPDATE SYM.TRACK_AREA SET YARD = '{1}', DESCRIPTION = '{2}', OFFSET_X = {3}, OFFSET_Y = {4}, CAMERA_OFFSET_X = {5}, CAMERA_OFFSET_Y = {6}, CAMERA_OFFSET_Z = {7}, CAMERA_ANGLE_XY = {8}, CAMERA_ANGLE_YZ = {9} WHERE AREA = '{0}';",
	UpdateSectionScript:
		"UPDATE SYM.TRACK_SECTION SET YARD = '{1}', AREA = '{2}', DESCRIPTION = '{3}', OFFSET_X = {4}, OFFSET_Y = {5}, CAMERA_OFFSET_X = {6}, CAMERA_OFFSET_Y = {7}, CAMERA_OFFSET_Z = {8}, CAMERA_ANGLE_XY = {9}, CAMERA_ANGLE_YZ = {10} WHERE SECTION = '{0}';",
	UpdateZoneScript:
		"UPDATE SYM.TRACK_ZONE SET ZONE = '{1}' , ZONE_TYPE = '{2}' , YARD = '{3}' , AREA = {4} , SECTION = {5} , STATUS = {6} , COLOR_BACKGROUND = '{7}' , COLOR_FOREGROUND = '{8}' , COLOR_FRAME = '{9}', POS_X_MIN = {10} , POS_X_MAX = {11} , POS_Y_MIN = {12} , POS_Y_MAX = {13} , POS_Z_MIN = {14} , POS_Z_MAX = {15} , DESCRIPTION = '{16}' , ID_ZONE_PREV_X = {17} , ID_ZONE_PREV_Y = {18} , ID_ZONE_PREV_Z = {19} , CAMERA_OFFSET_X = {20} , CAMERA_OFFSET_Y = {21} , CAMERA_OFFSET_Z = {22} , CAMERA_ANGLE_XY = {23} , CAMERA_ANGLE_YZ = {24} , PIECE_COUNT_MAX = {25} , PRIORITY = {26} , X_ALIGNMENT = {27} , Y_ALIGNMENT = {28} , ROTATE_ANGLE = {29} , TILT_ANGLE = {30} , GEN_EVENT_ENTER = {31} , GEN_EVENT_EXIT = {32} , MAX_STRESS = {33} , MAX_HEIGHT = {34} WHERE ID_ZONE = {0};",
	DeleteYardScript: "DELETE FROM SYM.TRACK_YARD WHERE YARD = '{0}';",
	DeleteAreaScript: "DELETE FROM SYM.TRACK_AREA WHERE AREA = '{0}';",
	DeleteSectionScript: "DELETE FROM SYM.TRACK_SECTION WHERE SECTION = '{0}';",
	DeleteZoneScript: "DELETE FROM SYM.TRACK_ZONE WHERE ID_ZONE = {0};",
};
