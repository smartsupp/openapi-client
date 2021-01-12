
export namespace SmartsuppCoreApi {
	export interface Account {
		
		anonymizeIp: boolean
		
		history: AccountHistoryEnum
		
		timezone: Timezone
		
		allowedDomains: string[]
		
		mainDomain: string
	}
	export interface Agent {
		
		id: number
		
		active: boolean
		
		role: AgentRoleEnum
		
		email: string
		
		fullname: string
		
		nickname: string
		
		description: string
		
		avatar: string
		
		lastLogin: string
		
		lastActivity: string
		
		deletedAt: string
	}
	export interface Attachment {
		
		type: AttachmentTypeEnum
		
		fileName: string
		
		fileType: string
		
		expireAt: string
		
		size: number
		
		width: number
		
		height: number
		
		thumb400?: AttachmentThumb
	}
	export interface AttachmentThumb {
		
		url: string
		
		expireAt: string
		
		width: number
		
		height: number
	}
	export interface Channel {
		
		type: string
		
		id: string
	}
	export interface Consent {
		
		type: string
		
		agreed: boolean
		
		confirmAt: string
	}
	export interface Contact {
		
		id: string
		
		createdAt: string
		
		updatedAt: string
		
		identityId: string
		
		name: string
		
		email: string
		
		phone: string
		
		note: string
		
		avatar: ContactAvatar
		
		bannedAt: string
		
		bannedBy: string
		
		chatsCount: number
		
		visitsCount: number
		
		lastSeenAt: string
	}
	export interface ContactAvatar {
		
		color: ContactAvatarColor
		
		initials: string
	}
	export interface ContactAvatarColor {
		
		text: string
		
		bg: string
	}
	export interface ContactDetails {
		
		name: string
		
		email: string
		
		phone: string
		
		note: string
		
		avatar: ContactAvatar
	}
	export interface Conversation {
		
		id: string
		
		type: string
		
		status: ConversationStatusEnum
		
		channel: Channel
		
		contactId: string
		
		visitorId: string
		
		createdAt: string
		
		updatedAt: string
		
		finishedAt: string
		
		agentIds: string[]
		
		assignedIds: string[]
		
		groupId: string
		
		locIp: string
		
		locCity: string
		
		locCode: string
		
		locCountry: string
		
		rating: ConversationRating
		
		referer: string
		
		domain: string
		
		userAgent: string
		
		tags: string[]
		
		variables: ConversationVariables
		
		important: boolean
		
		isClosed: boolean
		
		isOffline: boolean
		
		isServed: boolean
		/** available only when requested */
		lastMessage?: Message
		/** available only when requested */
		unreadInfo?: ConversationUnreadInfo
		/** available only when requested */
		readInfo?: ConversationReadInfo
		/** available only when requested */
		visitorDetails?: VisitorDetails
		/** available only when requested */
		contactDetails?: ContactDetails
		/** available only when requested */
		messages?: Message[]
		/** available only when requested */
		paths?: Path[]
	}
	export interface ConversationVariables {
	}
	export interface ConversationRating {
		/** 5 is best, 1 worst */
		value: number
		/** Optional rating text */
		text: string
	}
	export interface ConversationReadInfo {
		
		type: string
		
		lastReadAt: string
	}
	export interface ConversationUnreadInfo {
		
		type: string
		
		count: number
		
		lastReadAt: string
	}
	export interface Group {
		
		id: number
		
		key: string
		
		name: string
		
		agents: number[]
	}
	export interface InvitationInfo {
		
		id: number
		
		email: string
		
		role: AgentRoleEnum
		
		validThrough: string
		
		retryAfter: string
	}
	export interface Message {
		
		id: string
		
		type: MessageTypeEnum
		
		sub_type: MessageSubTypeEnum
		
		channel: Channel
		
		chatId: string
		
		groupId: string
		
		agentId: string
		
		visitorId: string
		
		createdAt: string
		
		content: MessageContent
		
		trigger: MessageTrigger
		
		responseTime: number
		
		deliveryTo: string
		
		deliveryStatus: string
		
		deliveryFailReason: string
		
		deliveredAt: string
		
		attachments: Attachment[]
	}
	export interface MessageContentData {
	}
	export interface MessageContent {
		
		type?: string
		
		text?: string
		
		data?: MessageContentData
	}
	export interface MessageTrigger {
		
		id: string
		
		name: string
	}
	export interface Metric {
		
		count: number
		
		value: number
		
		buckets: MetricBuckets[]
	}
	export interface MetricBuckets {
		
		key: string
		
		count: number
		
		value: number
	}
	export interface MetricAggregation {
		
		type: string
		
		field?: string
		
		interval?: string
		/** Moment.js format, eg: YYYY_DDD */
		format?: string
	}
	export interface MetricOptions {
		
		timezone?: string
		
		range: MetricRange
		
		query?: MetricQuery[]
		
		aggs?: MetricAggregation[]
	}
	export interface MetricQuery {
		
		field: string
		
		value: any
	}
	export interface MetricRange {
		
		from: string
		
		to: string
	}
	export interface NotificationsDashboard {
		
		enabled: boolean
		
		enabledOffline: boolean
		
		sounds: NotificationsDashboardSounds
	}
	export interface NotificationsDashboardSounds {
		
		message: NotificationsSound
		
		notification: NotificationsSound
		
		connected: NotificationsSound
		
		disconnected: NotificationsSound
	}
	export interface NotificationsSound {
		
		enabled: boolean
		
		volume: number
		
		name: string
	}
	export interface NotificationsMobile {
		
		events: NotificationsMobileEvents
	}
	export interface NotificationsMobileEvents {
		
		incoming_visitor: NotificationsMobileEvent
		
		incoming_message: NotificationsMobileEvent
	}
	export interface NotificationsMobileEvent {
		
		enabled: boolean
		
		sound: NotificationsMobileEventSound
	}
	export interface NotificationsMobileEventSound {
		
		enabled: boolean
		
		name: string
	}
	export interface OfficeHours {
		
		isActive: boolean
		
		config: OfficeHoursConfig
	}
	export interface OfficeHoursConfig {
		
		sunday: OfficeHoursDay
		
		monday: OfficeHoursDay
		
		tuesday: OfficeHoursDay
		
		wednesday: OfficeHoursDay
		
		thursday: OfficeHoursDay
		
		friday: OfficeHoursDay
		
		saturday: OfficeHoursDay
	}
	export interface OfficeHoursDay {
		
		enabled: boolean
		
		times: OfficeHoursInterval[]
	}
	export interface OfficeHoursInterval {
		
		from: number
		
		to: number
	}
	export interface Path {
		
		url: string
		
		title: string
		
		createdAt: string
	}
	export interface ProductNew {
		
		title: string
		
		content: string
		
		publishedAt: string
		
		isUnread: boolean
	}
	export interface Restriction {
		
		id: number
		
		type: RestrictionTypeEnum
		
		value: string
	}
	export interface Shortcut {
		
		id: number
		
		type: ShortcutTypeEnum
		
		name: string
		
		text: string
	}
	export interface Timezone {
		
		name: string
		
		text: string
		
		offset: number
		
		offsetText: string
	}
	export interface User {
		
		id: number
		
		role: AgentRoleEnum
		
		email: string
		
		fullname: string
		
		nickname: string
		
		avatar: string
		
		avatarUploadRequired: boolean
		
		noPassword: boolean
		
		description: string
		
		status: AgentStatusEnum
		
		active: boolean
		
		wizard: UserWizard
		
		boxes: UserBoxes
	}
	export interface UserWizard {
	}
	export interface UserBoxes {
	}
	export interface Visitor {
		
		id: string
		
		avatar: VisitorAvatar
		
		bannedAt: string
		
		chatsCount: number
		
		connectedAt: string
		
		contactId: string
		
		createdAt: string
		
		domain: string
		
		email: string
		
		group: string
		
		lastSeenAt: string
		
		locCode: string
		
		locCountry: string
		
		name: string
		
		pageTitle: string
		
		pageUrl: string
		
		referer: string
		
		servedBy: string[]
		
		status: string
		
		viewsCount: number
		
		visitsCount: number
		
		chatId: string
		
		lang: string
		
		locIp: string
		
		locCity: string
		
		browser: string
		
		browserVersion: string
		
		platform: string
		
		os: string
		
		userAgent: string
		
		paths: VisitorPaths[]
	}
	export interface VisitorAvatarColor {
		
		text: string
		
		bg: string
	}
	export interface VisitorAvatar {
		
		color: VisitorAvatarColor
		
		initials: string
	}
	export interface VisitorPaths {
		
		url: string
		
		title: string
		
		createdAt: string
	}
	export interface VisitorDetails {
		
		connectedAt: string
	}
	export interface VisitorSimple {
		
		id: string
		
		avatar: ContactAvatar
		
		bannedAt: string
		
		chatsCount: number
		
		connectedAt: string
		
		contactId: string
		
		createdAt: string
		
		domain: string
		
		email: string
		
		group: string
		
		lastSeenAt: string
		
		locCode: string
		
		locCountry: string
		
		name: string
		
		pageTitle: string
		
		pageUrl: string
		
		referer: string
		
		servedBy: string[]
		
		status: VisitorStatusEnum
		
		viewsCount: number
		
		visitsCount: number
	}
	export interface WidgetConfig {
		
		lang: string
		
		orientation: WidgetOrientationEnum
		
		ratingEnabled: boolean
		
		transcriptEnabled: boolean
		
		hideWidget: boolean
		
		hideOfflineChat: boolean
		
		requireLogin: boolean
		
		emailControl: boolean
		
		nameControl: boolean
		
		numberControl: boolean
		
		privacyNoticeEnabled: boolean
		
		privacyNoticeUrl: string
		
		privacyNoticeCheckRequired: boolean
		
		groupSelectEnabled: boolean
		
		color: string
		
		buttonStyle: WidgetButtonStyleEnum
		
		internalAnalyticsEnabled: boolean
		
		translates: WidgetConfigTranslates
		
		features: WidgetFeatures
		
		installCode: string
	}
	export interface WidgetConfigTranslates {
	}
	export interface WidgetFeatures {
		
		customize: boolean
		
		rating: boolean
		
		transcript: boolean
		
		api: boolean
		
		ga: boolean
		
		groups: boolean
	}
	export interface WidgetTranslates {
	}
	export interface WidgetLanguage {
		
		name: string
		
		priority: number
	}
	export interface TypicalErrorResponse {
		
		code: string
		
		message: string
		/** List of error in case of bad_request errors. */
		errors?: TypicalErrorDetail[]
	}
	export interface TypicalErrorDetail {
		
		path: string
		
		code: string
		
		message: string
		
		location: string
	}
	export interface TypicalBatchDeleteRequest {
		
		ids?: number[]
	}
	export enum AccountHistoryEnum {
		Unlimited = 'unlimited',
		_1Years = '1_years',
		_3Months = '3_months',
	}
	export enum AgentRoleEnum {
		Agent = 'agent',
		Admin = 'admin',
		Owner = 'owner',
	}
	export enum AgentStatusEnum {
		Online = 'online',
		Offline = 'offline',
	}
	export enum AttachmentTypeEnum {
		File = 'file',
		Image = 'image',
		Invalid = 'invalid',
	}
	export enum ConversationStatusEnum {
		Pending = 'pending',
		Open = 'open',
		Served = 'served',
		Closed = 'closed',
	}
	export enum MessageSubTypeEnum {
		Agent = 'agent',
		Contact = 'contact',
		System = 'system',
		Trigger = 'trigger',
		Bot = 'bot',
	}
	export enum MessageTypeEnum {
		Message = 'message',
		Note = 'note',
		Event = 'event',
	}
	export enum MetricNameEnum {
		ResponseTime = 'response_time',
		FirstResponseTime = 'first_response_time',
		TimeToClose = 'time_to_close',
		TimeToCloseSum = 'time_to_close_sum',
		NewConversation = 'new_conversation',
		ClosedConversation = 'closed_conversation',
		ConversationRatings = 'conversation_ratings',
	}
	export enum RestrictionTypeEnum {
		Ip = 'ip',
	}
	export enum ShortcutTypeEnum {
		Personal = 'personal',
		Team = 'team',
	}
	export enum VisitorStatusEnum {
		Active = 'active',
		Clicked = 'clicked',
		Served = 'served',
		Triggered = 'triggered',
		Unserved = 'unserved',
	}
	export enum WidgetButtonStyleEnum {
		Greeting = 'greeting',
		Bubble = 'bubble',
	}
	export enum WidgetOrientationEnum {
		Right = 'right',
		Left = 'left',
	}
	export interface RequestConsentCreate {
		
		type: string
		
		agreed: boolean
	}
	export interface ResponseOk {
		
		ok: boolean
	}

	export namespace Account {
		export interface UpdateBody {
			
			timezone?: string
			
			history?: AccountHistoryEnum
			
			anonymizeIp?: boolean
			
			allowedDomains?: string[]
			
			mainDomain?: string
		}
		export interface DeleteBody {
			
			password?: string
			
			dry?: boolean
		}
		export interface DeleteResponse {
			
			ok: boolean
			
			dry: boolean
		}
	}
	export namespace Agents {
		export interface UpdateBody {
			
			fullname?: string
			
			description?: string
			
			role?: string
		}
		export interface UpdateActiveBody {
			
			active: boolean
		}
		export interface UpdateActiveResponse {
			
			active: boolean
		}
	}
	export namespace Consents {
	}
	export namespace Contacts {
		export interface UpdateBody {
			
			name?: string
			
			email?: string
			
			phone?: string
			
			note?: string
		}
	}
	export namespace Conversations {
		export interface DeleteManyBody {
			
			ids: string[]
		}
		export interface DeleteManyResponseData {
			
			code?: string
			
			message?: string
		}
		export interface DeleteManyResponse {
			
			id: string
			
			status: number
			
			data?: DeleteManyResponseData
		}
		export interface SearchQuery {
			/** Export contact details */
			contactDetails?: boolean
			/** Export visitor details */
			visitorDetails?: boolean
			/** Export last messages */
			lastMessage?: boolean
			/** Export unread info */
			unreadInfo?: boolean
			/** Allow fetch more then 250 items */
			allowExtraSize?: boolean
		}
		export interface SearchBodySort {
			
			createdAt?: string
			
			finishedAt?: string
		}
		export interface SearchBodyFilters {
			
			query?: string
			
			dateFrom?: string
			
			dateTo?: string
			
			pageUrl?: string
			
			locIp?: string
			
			contactId?: string
		}
		export interface SearchBodyQuery {
			
			field: string
			
			value: any
			
			op?: string
		}
		export interface SearchBody {
			
			timezone?: string
			
			size?: number
			
			after?: number[]
			
			sort?: SearchBodySort[]
			
			filters?: SearchBodyFilters
			
			query?: SearchBodyQuery[]
		}
		export interface SearchResponse {
			
			after: number[]
			
			items: Conversation[]
			
			total: number
		}
		export interface GetQuery {
			/** Export contact details */
			contactDetails?: boolean
			/** Export visitor details */
			visitorDetails?: boolean
			/** Export last messages */
			lastMessage?: boolean
			/** Export unread info */
			unreadInfo?: boolean
			/** Export read info */
			readInfo?: boolean
			/** Export last paths */
			paths?: number
			/** Paths order */
			pathsOrder?: string
			/** Export last messages */
			messages?: number
			/** Messages order */
			messagesOrder?: string
		}
		export interface UpdateBody {
			
			important?: boolean
			
			tags?: string[]
		}
		export interface CreateMessageBodyContentData {
		}
		export interface CreateMessageBodyContent {
			
			type: string
			
			text: string
			
			data: CreateMessageBodyContentData
		}
		export interface CreateMessageBody {
			
			type: string
			
			channel?: Channel
			
			content: CreateMessageBodyContent
			/** List of upload tokens */
			attachments?: string[]
		}
		export interface JoinQuery {
			/** Require join to conversation */
			required?: boolean
		}
		export interface AssignBody {
			
			id: string
		}
		export interface UnassignBody {
			
			id: string
		}
		export interface ReadResponse {
			
			lastReadAt: string
		}
		export interface TranscriptBody {
			
			email: string
			
			lang?: string
		}
		export interface UploadInitBody {
			
			type?: string
		}
		export interface UploadInitResponse {
			
			url: string
			
			token: string
		}
		export interface UploadFinishBody {
			
			token: string
			
			channel?: Channel
		}
		export interface ListMessagesQuery {
			
			size?: number
			
			after?: number
			
			order?: string
		}
		export interface ListMessagesResponse {
			
			after: number
			
			items: Message[]
			
			total: number
		}
		export interface ListPathsQuery {
			
			size?: number
			
			after?: number
			
			order?: string
		}
		export interface ListPathsResponse {
			
			after: number
			
			items: Path[]
			
			total: number
		}
	}
	export namespace Groups {
		export interface CreateBody {
			
			name: string
			
			agents: number[]
		}
		export interface UpdateBody {
			
			name?: string
			
			agents?: number[]
		}
	}
	export namespace Invitations {
		export interface InviteBodyAgents {
			
			email: string
			
			role?: AgentRoleEnum
		}
		export interface InviteBody {
			
			agents: InviteBodyAgents[]
		}
		export interface NotifyBody {
			
			ids: number[]
		}
		export interface CancelBody {
			
			ids: number[]
		}
	}
	export namespace Mail {
		export interface SendBody {
			
			to: string
			
			lang: string
		}
	}
	export namespace Metrics {
		export interface GetBody {
			
			timezone?: string
			
			name: MetricNameEnum
			
			options: MetricOptions
		}
		export interface GetManyBody {
			
			timezone?: string
			
			items?: any
		}
		export interface GetManyResponse {
		}
	}
	export namespace Mobile {
		export interface GetConfigResponse {
			
			uploadImageMaxWidth: number
			
			uploadImageMaxHeight: number
			
			uploadImageCompression: number
			
			uploadFileMaxSize: number
			
			acceptedFileTypes: string[]
			
			acceptedFileExtensions: string[]
		}
	}
	export namespace Notifications {
		export interface DashboardUpdateBodySounds {
			
			message?: NotificationsSound
			
			notification?: NotificationsSound
			
			connected?: NotificationsSound
			
			disconnected?: NotificationsSound
		}
		export interface DashboardUpdateBody {
			
			enabled?: boolean
			
			enabledOffline?: boolean
			
			sounds?: DashboardUpdateBodySounds
		}
		export interface MobileUpdateBodyEvents {
			
			incoming_visitor?: NotificationsMobileEvent
			
			incoming_message?: NotificationsMobileEvent
		}
		export interface MobileUpdateBody {
			
			events?: MobileUpdateBodyEvents
		}
	}
	export namespace Officehours {
		export interface UpdateBodyConfig {
			
			sunday: OfficeHoursDay
			
			monday: OfficeHoursDay
			
			tuesday: OfficeHoursDay
			
			wednesday: OfficeHoursDay
			
			thursday: OfficeHoursDay
			
			friday: OfficeHoursDay
			
			saturday: OfficeHoursDay
		}
		export interface UpdateBody {
			
			isActive?: boolean
			
			config?: UpdateBodyConfig
		}
	}
	export namespace Onboarding {
		export interface UpdateBody {
			/** Code of step to set as done. */
			code: string
		}
		export interface UpdateResponse {
			
			code: string
			
			doneAt: string
		}
	}
	export namespace ProductNews {
		export interface ListQuery {
			/** Lang */
			lang?: string
		}
	}
	export namespace Restrictions {
		export interface CreateBody {
			
			type: RestrictionTypeEnum
			
			value: string
		}
		export interface UpdateBody {
			
			value: string
		}
	}
	export namespace Shortcuts {
		export interface CreateBody {
			/** Shortcut type. Agents can&#x27;t create team shortcuts. */
			type?: ShortcutTypeEnum
			/** Shortcut name. Name must be unique per user or team shortcuts */
			name: string
			
			text: string
		}
		export interface UpdateBody {
			/** Shortcut type. Agents can&#x27;t change shortcut type. */
			type?: ShortcutTypeEnum
			/** Shortcut name. Name must be unique per user or team shortcuts */
			name?: string
			/** Shortcut text. */
			text?: string
		}
	}
	export namespace Survey {
		export interface AnswerBodyName {
			
			key?: string
			
			text?: string
		}
		export interface AnswerBodyMainChoice {
			
			key?: string
			
			text?: string
		}
		export interface AnswerBodySubChoice {
			
			key?: string
			
			text?: string
		}
		export interface AnswerBody {
			/** Name of the survey */
			name: AnswerBodyName
			/** Name of the selected main choice */
			mainChoice: AnswerBodyMainChoice
			/** Name of the selected sub choice */
			subChoice?: AnswerBodySubChoice
			/** Comment for the selected choice */
			comment?: string
		}
	}
	export namespace Timezones {
	}
	export namespace User {
		export interface UpdateBodyWizard {
		}
		export interface UpdateBody {
			/** Email of the user. Must be unique. */
			email?: string
			/** Fullname of the user. */
			fullname?: string
			/** Nickname of the user. */
			nickname?: string
			/** New password of the user. Minimum of 6 characters, max 256. If password is successfully changed, property named &quot;csrfToken&quot; will appear in the response. And client must include that token in upcoming requests. */
			password?: string
			/** Current password of the user. */
			passwordCurrent?: string
			/** Job position or personal motto, visible to visitors. */
			description?: string
			/** Avatar of the user. Base64 encoded image format. */
			avatar?: string
			/** Status of the user. */
			status?: AgentStatusEnum
			/** Configuration for wizard. */
			wizard?: UpdateBodyWizard
		}
		export interface UpdateResponseWizard {
		}
		export interface UpdateResponseBoxes {
		}
		export interface UpdateResponse {
			
			id: number
			
			role: string
			
			email: string
			
			fullname: string
			
			nickname: string
			
			avatar: string
			
			avatarUploadRequired: boolean
			
			noPassword: boolean
			
			description: string
			
			status: string
			
			active: boolean
			
			wizard: UpdateResponseWizard
			
			boxes: UpdateResponseBoxes
			/** Exported when password is changed */
			csrfToken?: string
		}
		export interface GetStatsQuery {
			/** Timezone name. Default account timezone is used. */
			timezone?: string
			/** Date From */
			from?: string
			/** Date To */
			to?: string
		}
		export interface GetStatsResponse {
			
			count?: number
			
			ratingAvg?: number
			
			durationTimeAvg?: number
			
			durationTimeSum?: number
			
			responseTimeAvg?: number
			
			firstResponseTimeAvg?: number
			
			ratingSum?: number
		}
		export interface GetUnreadChatsResponse {
			
			count?: number
		}
	}
	export namespace Visitors {
		export interface SearchBodyFilters {
			
			status?: VisitorStatusEnum[]
			
			banned?: boolean
			
			customers?: boolean
		}
		export interface SearchBodyQuery {
			
			query?: string
			
			fields?: string[]
			
			value?: any
			
			op?: string
		}
		export interface SearchBody {
			
			size?: number
			
			after?: number
			
			filters?: SearchBodyFilters
			
			query?: SearchBodyQuery[]
		}
		export interface SearchResponseCounters {
			
			filtered?: number
			
			searched?: number
			
			total?: number
		}
		export interface SearchResponse {
			
			after?: number
			
			items?: VisitorSimple[]
			
			total?: number
			
			counters?: SearchResponseCounters
		}
		export interface StartChatResponse {
			
			id?: string
			
			status?: string
		}
	}
	export namespace Widget {
		export interface UpdateBodyTranslates {
		}
		export interface UpdateBody {
			
			lang?: string
			
			orientation?: WidgetOrientationEnum
			
			ratingEnabled?: boolean
			
			transcriptEnabled?: boolean
			
			hideWidget?: boolean
			
			hideOfflineChat?: boolean
			
			requireLogin?: boolean
			
			emailControl?: boolean
			
			nameControl?: boolean
			
			numberControl?: boolean
			
			privacyNoticeEnabled?: boolean
			
			privacyNoticeUrl?: string
			
			privacyNoticeCheckRequired?: boolean
			
			groupSelectEnabled?: boolean
			
			color?: string
			
			buttonStyle?: WidgetButtonStyleEnum
			
			translates?: UpdateBodyTranslates
		}
	}
}
