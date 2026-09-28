import { httpService } from "../http/http.services";
import { Team } from "../../lib/types"

class TeamService {
    private endpoint: string = "/teams";

    private pendingAllRequest: Promise<Team[]> | null = null;
    private pendingGuidRequests: Map<string, Promise<Team>> = new Map();

    public getAll(): Promise<Team[]> {
        if (this.pendingAllRequest) {
            return this.pendingAllRequest;
        }

        this.pendingAllRequest = httpService.get<Team[]>(`${this.endpoint}`)
            .finally(() => {
                this.pendingAllRequest = null;
            });

        return this.pendingAllRequest;
    }

    public getByGuid(code: string): Promise<Team> {
        if (this.pendingGuidRequests.has(code)) {
            return this.pendingGuidRequests.get(code)!;
        }

        const request = httpService.get<Team>(`${this.endpoint}/${code}`)
            .finally(() => {
                this.pendingGuidRequests.delete(code);
            });

        this.pendingGuidRequests.set(code, request);
        return request;
    }
}

export const teamService = new TeamService();