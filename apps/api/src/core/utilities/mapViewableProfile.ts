import type {
    ProjectedViewableUserProfile,
    ViewableProfile,
} from "@bump-connect/types";

export function mapProjectedViewableProfile(
    user: ProjectedViewableUserProfile,
): ViewableProfile {
    const { profile, _id, username } = user;
    return {
        _id,
        username,
        ...profile,
    };
}
