/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrsErrorResponse {
  error?: string;
  message?: string;
}

/** Упрощенная модель пользователя для отображения в задачах */
export interface ModelsAssigneeUserForTask {
  avatarUrl?: string;
  email?: string;
  fullName?: string;
  id?: number;
}

/** Запрос на создание новой задачи */
export interface ModelsCreateTaskRequest {
  assigneeId: number;
  boardId: number;
  /**
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** @example "Medium" */
  priority?: "Low" | "Medium" | "High";
  /**
   * @minLength 1
   * @maxLength 100
   */
  title: string;
}

/** Ответ после успешного создания задачи */
export interface ModelsCreateTaskResponse {
  id?: number;
}

/** Содержит основную информацию о доске и количество задач */
export interface ModelsGetBoardsResponse {
  description?: string;
  id?: number;
  name?: string;
  taskCount?: number;
}

/** Содержит полные данные задачи, включая информацию об исполнителе и доске */
export interface ModelsGetTaskByIDResponse {
  /** Упрощенная модель пользователя для отображения в задачах */
  assignee?: ModelsAssigneeUserForTask;
  boardName?: string;
  description?: string;
  id?: number;
  /** @example "High" */
  priority?: "Low" | "Medium" | "High";
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
  title?: string;
}

/** Ответ с данными задач, принадлежащих конкретной доске */
export interface ModelsGetTasksOnBoardResponse {
  /** Упрощенная модель пользователя для отображения в задачах */
  assignee?: ModelsAssigneeUserForTask;
  description?: string;
  id?: number;
  /** @example "Medium" */
  priority?: "Low" | "Medium" | "High";
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
  title?: string;
}

/** Содержит основные данные о задачах с информацией об исполнителях и досках */
export interface ModelsGetTasksResponse {
  /** Упрощенная модель пользователя для отображения в задачах */
  assignee?: ModelsAssigneeUserForTask;
  boardId?: number;
  boardName?: string;
  description?: string;
  id?: number;
  /** @example "Medium" */
  priority?: "Low" | "Medium" | "High";
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
  title?: string;
}

/** Содержит данные о досках, принадлежащих команде */
export interface ModelsGetTeamBoards {
  description?: string;
  id?: number;
  name?: string;
}

/** Содержит данные о команде, включая пользователей и доски */
export interface ModelsGetTeamResponse {
  boards?: ModelsGetTeamBoards[];
  description?: string;
  id?: number;
  name?: string;
  users?: ModelsGetTeamUsers[];
}

/** Содержит данные о пользователях, принадлежащих команде */
export interface ModelsGetTeamUsers {
  avatarUrl?: string;
  description?: string;
  email?: string;
  fullName?: string;
  id?: number;
}

/** Содержит данные о команде, включая количество пользователей и досок */
export interface ModelsGetTeamsResponse {
  boardsCount?: number;
  description?: string;
  id?: number;
  name?: string;
  usersCount?: number;
}

/** Содержит данные о задаче, включая информацию о доске */
export interface ModelsGetUserTasksResponse {
  boardName?: string;
  description?: string;
  id?: number;
  /** @example "Medium" */
  priority?: "Low" | "Medium" | "High";
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
  title?: string;
}

/** Содержит данные о пользователе, включая информацию о команде и количестве задач */
export interface ModelsGetUsersResponse {
  avatarUrl?: string;
  description?: string;
  email?: string;
  fullName?: string;
  id?: number;
  tasksCount?: number;
  teamId?: number;
  teamName?: string;
}

/** Запрос на обновление существующей задачи */
export interface ModelsUpdateTaskRequest {
  assigneeId: number;
  /**
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** @example "Medium" */
  priority?: "Low" | "Medium" | "High";
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
  /**
   * @minLength 1
   * @maxLength 100
   */
  title: string;
}

/** Ответ после успешного обновления задачи */
export interface ModelsUpdateTaskResponse {
  message?: string;
}

export interface ModelsUpdateTaskStatusRequest {
  /** @example "Done" */
  status?: "Backlog" | "InProgress" | "Done";
}

export interface ModelsUpdateTaskStatusResponse {
  message?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//localhost:8080/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Avito FE Tech Internship 2025 Wave 2 API
 * @version 1.0
 * @baseUrl //localhost:8080/api/v1
 * @contact
 *
 * API для управления задачами и досками
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  boards = {
    /**
     * @description Возвращает массив досок с основной информацией и количеством задач в каждой
     *
     * @tags Доски
     * @name BoardsList
     * @summary Получить список всех досок
     * @request GET:/boards
     */
    boardsList: (params: RequestParams = {}) =>
      this.request<ModelsGetBoardsResponse[], ErrsErrorResponse>({
        path: `/boards`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает все задачи, принадлежащие указанной доске
     *
     * @tags Доски
     * @name BoardsDetail
     * @summary Получить задачи доски
     * @request GET:/boards/{boardId}
     */
    boardsDetail: (boardId: number, params: RequestParams = {}) =>
      this.request<ModelsGetTasksOnBoardResponse[], ErrsErrorResponse>({
        path: `/boards/${boardId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tasks = {
    /**
     * @description Возвращает массив задач с полной информацией, включая данные исполнителей и досок
     *
     * @tags Задачи
     * @name TasksList
     * @summary Получить список всех задач
     * @request GET:/tasks
     */
    tasksList: (params: RequestParams = {}) =>
      this.request<ModelsGetTasksResponse[], ErrsErrorResponse>({
        path: `/tasks`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает новую задачу с указанными параметрами
     *
     * @tags Задачи
     * @name CreateCreate
     * @summary Создать новую задачу
     * @request POST:/tasks/create
     */
    createCreate: (
      input: ModelsCreateTaskRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsCreateTaskResponse, ErrsErrorResponse>({
        path: `/tasks/create`,
        method: "POST",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет задачу по указанному ID
     *
     * @tags Задачи
     * @name UpdateUpdate
     * @summary Обновить задачу
     * @request PUT:/tasks/update/{taskId}
     */
    updateUpdate: (
      taskId: number,
      input: ModelsUpdateTaskRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsUpdateTaskResponse, ErrsErrorResponse>({
        path: `/tasks/update/${taskId}`,
        method: "PUT",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет статус задачи по указанному ID
     *
     * @tags Задачи
     * @name UpdateStatusUpdate
     * @summary Обновить статус задачи
     * @request PUT:/tasks/updateStatus/{taskId}
     */
    updateStatusUpdate: (
      taskId: number,
      input: ModelsUpdateTaskStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<ModelsUpdateTaskStatusResponse, ErrsErrorResponse>({
        path: `/tasks/updateStatus/${taskId}`,
        method: "PUT",
        body: input,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает полную информацию о задаче, включая данные исполнителя и доски
     *
     * @tags Задачи
     * @name TasksDetail
     * @summary Получить задачу по ID
     * @request GET:/tasks/{taskId}
     */
    tasksDetail: (taskId: number, params: RequestParams = {}) =>
      this.request<ModelsGetTaskByIDResponse, ErrsErrorResponse>({
        path: `/tasks/${taskId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  teams = {
    /**
     * @description Получает информацию о всех командах, включая количество пользователей и досок
     *
     * @tags Команды
     * @name TeamsList
     * @summary Получить информацию о всех командах
     * @request GET:/teams
     */
    teamsList: (params: RequestParams = {}) =>
      this.request<ModelsGetTeamsResponse[], ErrsErrorResponse>({
        path: `/teams`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получает информацию о команде по ID, включая пользователей и доски
     *
     * @tags
     * @name TeamsDetail
     * @summary Получить информацию о команде
     * @request GET:/teams/{teamId}
     */
    teamsDetail: (teamId: number, params: RequestParams = {}) =>
      this.request<ModelsGetTeamResponse, ErrsErrorResponse>({
        path: `/teams/${teamId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Получает информацию о всех пользователях, включая их команды и количество задач
     *
     * @tags Пользователи
     * @name UsersList
     * @summary Получить информацию о всех пользователях
     * @request GET:/users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<ModelsGetUsersResponse[], ErrsErrorResponse>({
        path: `/users`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получает список задач для указанного пользователя по его ID
     *
     * @tags Пользователи
     * @name TasksList
     * @summary Получить задачи пользователя
     * @request GET:/users/{id}/tasks
     */
    tasksList: (id: number, params: RequestParams = {}) =>
      this.request<ModelsGetUserTasksResponse[], ErrsErrorResponse>({
        path: `/users/${id}/tasks`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
