import { httpService } from "../http/http.services";
import { Ticket, TicketSummary } from "../../lib/types"

class TeamService {
    private endpoint: string = "/tickets";

    private pendingAllRequest: Promise<Ticket[]> | null = null;
    private pendingSummaryRequest: Promise<TicketSummary> | null = null;
    private pendingGuidRequests: Map<string, Promise<Ticket>> = new Map();

    public getAll(): Promise<Ticket[]> {
        if (this.pendingAllRequest) {
            return this.pendingAllRequest;
        }

        this.pendingAllRequest = httpService.get<Ticket[]>(`${this.endpoint}`)
            .finally(() => {
                this.pendingAllRequest = null;
            });

        return this.pendingAllRequest;
    }

    public getAllSummary(): Promise<TicketSummary> {
        if (this.pendingSummaryRequest) {
            return this.pendingSummaryRequest;
        }

        this.pendingSummaryRequest = httpService.get<TicketSummary>(`${this.endpoint}?summary=true`)
            .finally(() => {
                this.pendingSummaryRequest = null;
            });

        return this.pendingSummaryRequest;
    }

    public getByGuid(code: string): Promise<Ticket> {
        if (this.pendingGuidRequests.has(code)) {
            return this.pendingGuidRequests.get(code)!;
        }

        const request = httpService.get<Ticket>(`${this.endpoint}/${code}`)
            .finally(() => {
                this.pendingGuidRequests.delete(code);
            });

        this.pendingGuidRequests.set(code, request);
        return request;
    }
}

export const ticketService = new TeamService();