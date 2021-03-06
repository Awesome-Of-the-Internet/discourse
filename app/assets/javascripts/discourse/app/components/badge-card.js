import { emojiUnescape, sanitize } from "discourse/lib/text";
import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { isEmpty } from "@ember/utils";

export default Component.extend({
  size: "medium",
  classNameBindings: [":badge-card", "size", "badge.slug"],

  @discourseComputed("badge.url", "filterUser", "username")
  url(badgeUrl, filterUser, username) {
    return filterUser ? `${badgeUrl}?username=${username}` : badgeUrl;
  },

  @discourseComputed("count", "badge.grant_count")
  displayCount(count, grantCount) {
    if (count == null) {
      return grantCount;
    }
    if (count > 1) {
      return count;
    }
  },

  @discourseComputed("size")
  summary(size) {
    if (size === "large") {
      const longDescription = this.get("badge.long_description");
      if (!isEmpty(longDescription)) {
        return emojiUnescape(sanitize(longDescription));
      }
    }
    return sanitize(this.get("badge.description"));
  },
});
